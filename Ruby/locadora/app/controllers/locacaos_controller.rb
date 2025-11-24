class LocacaosController < ApplicationController
  before_action :set_locacao, only: %i[show update destroy finalizar]

  # GET /locacaos
  def index
    locacoes = Locacao.includes(:cliente, item_locacoes: { exemplar: :midia })

    # Filtros
    locacoes = locacoes.where(cliente_id: params[:cliente_id]) if params[:cliente_id]
    locacoes = locacoes.ativas if params[:status] == 'ativas'
    locacoes = locacoes.atrasadas if params[:status] == 'atrasadas'

    render json: locacoes.as_json(
      include: {
        cliente: { only: [:id, :nome, :sobrenome] },
        item_locacoes: {
          include: {
            exemplar: {
              include: {
                midia: { only: [:id, :titulo] }
              }
            }
          }
        }
      },
      methods: [:valor_total, :status, :dias_atraso]
    )
  end

  # GET /locacaos/:id
  def show
    render json: @locacao.as_json(
      include: {
        cliente: { only: [:id, :nome, :sobrenome, :email] },
        item_locacoes: {
          include: {
            exemplar: {
              include: {
                midia: {
                  only: [:id, :titulo, :ano_lancamento],
                  include: {
                    classificacao_interna: { only: [:descricao, :valor_aluguel] }
                  }
                }
              }
            }
          }
        }
      },
      methods: [:valor_total, :status, :dias_atraso]
    )
  end

  # POST /locacaos
  # Cria locação simples (sem itens)
  def create
    locacao = Locacao.new(locacao_params)

    if locacao.save
      render json: locacao.as_json(methods: [:valor_total, :status]), status: :created
    else
      render json: { errors: locacao.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # POST /locacaos/with_items
  # Cria locação com itens
  def create_with_items
    cliente = Cliente.find_by(id: params[:cliente_id])

    unless cliente
      return render json: { errors: ["Cliente não encontrado"] }, status: :not_found
    end

    # Verifica se cliente pode alugar
    unless cliente.pode_alugar?
      return render json: {
        errors: ["Cliente possui locação em atraso"],
        locacoes_atrasadas: cliente.locacoes_atrasadas.as_json(only: [:id, :data_fim], methods: :dias_atraso)
      }, status: :unprocessable_entity
    end

    # Validação
    itens_params = params[:itens] || []
    if itens_params.empty?
      return render json: { errors: ["Nenhum item informado"] }, status: :unprocessable_entity
    end

    erros = []
    itens_validados = []

    # Valida disponibilidade de cada item
    itens_params.each_with_index do |item, index|
      midia_id = item[:midia_id]
      quantidade = item[:quantidade].to_i

      unless midia_id.present?
        erros << "Item #{index + 1}: midia_id é obrigatório"
        next
      end

      midia = Midium.find_by(id: midia_id)
      unless midia
        erros << "Item #{index + 1}: Mídia não encontrada (id: #{midia_id})"
        next
      end

      # Verifica estoque disponível
      qtd_disponivel = Exemplar.quantidade_disponivel_para_locacao(midia_id)

      if quantidade > qtd_disponivel
        erros << "Item #{index + 1}: '#{midia.titulo}' - quantidade solicitada (#{quantidade}) maior que disponível (#{qtd_disponivel})"
        next
      end

      if quantidade < 1
        erros << "Item #{index + 1}: quantidade deve ser no mínimo 1"
        next
      end

      # Busca por exemplares
      exemplares = Exemplar.disponiveis_para_locacao(midia_id).limit(quantidade)

      if exemplares.count < quantidade
        erros << "Item #{index + 1}: não há exemplares suficientes disponíveis"
        next
      end

      itens_validados << {
        midia: midia,
        exemplares: exemplares,
        quantidade: quantidade
      }
    end

    if erros.any?
      return render json: { errors: erros }, status: :unprocessable_entity
    end

    # Cria a locação com todos os itens em uma transação
    begin
      locacao = nil

      ActiveRecord::Base.transaction do
        # Cria a locação
        locacao = Locacao.create!(
          cliente: cliente,
          data_inicio: params[:data_inicio] || Date.today,
          data_fim: params[:data_fim] || (Date.today + 7.days),
          cancelada: false
        )

        # Cria os itens da locação
        itens_validados.each do |item_validado|
          item_validado[:exemplares].each do |exemplar|
            ItemLocacao.create!(
              locacao: locacao,
              exemplar: exemplar,
              valor: exemplar.midia.classificacao_interna.valor_aluguel
            )
          end
        end
      end

      render json: {
        message: "Locação criada com sucesso",
        locacao: locacao.as_json(
          include: {
            item_locacoes: {
              include: {
                exemplar: {
                  include: { midia: { only: [:id, :titulo] } }
                }
              }
            }
          },
          methods: [:valor_total, :status]
        )
      }, status: :created

    rescue ActiveRecord::RecordInvalid => e
      render json: { errors: [e.message] }, status: :unprocessable_entity
    rescue StandardError => e
      render json: { errors: ["Erro ao criar locação: #{e.message}"] }, status: :internal_server_error
    end
  end

  # PATCH/PUT /locacaos/:id
  def update
    if @locacao.update(locacao_params)
      render json: @locacao.as_json(methods: [:valor_total, :status]), status: :ok
    else
      render json: { errors: @locacao.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # POST /locacaos/:id/finalizar
  # Finaliza locação (devolução)
  def finalizar
    begin
      @locacao.finalizar!
      render json: {
        message: "Locação finalizada com sucesso",
        locacao: @locacao.as_json(methods: [:valor_total, :status])
      }, status: :ok
    rescue StandardError => e
      render json: { errors: ["Erro ao finalizar locação: #{e.message}"] }, status: :unprocessable_entity
    end
  end

  # DELETE /locacaos/:id
  # Cancela a locação
  def destroy
    begin
      @locacao.cancelar!
      render json: { message: "Locação cancelada com sucesso" }, status: :ok
    rescue StandardError => e
      render json: { errors: ["Erro ao cancelar locação: #{e.message}"] }, status: :unprocessable_entity
    end
  end

  private

  def set_locacao
    @locacao = Locacao.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { errors: ["Locação não encontrada"] }, status: :not_found
  end

  def locacao_params
    params.require(:locacao).permit(
      :data_inicio,
      :data_fim,
      :cancelada,
      :cliente_id
    )
  end
end