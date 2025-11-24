# app/controllers/disponibilidade_controller.rb
class DisponibilidadeController < ApplicationController

  # GET /disponibilidade
  # Retorna disponibilidade de todas as mídias
  def index
    midias = Midium.includes(:classificacao_interna, :exemplares).all

    resultado = midias.map do |midia|
      {
        midia_id: midia.id,
        titulo: midia.titulo,
        ano_lancamento: midia.ano_lancamento,
        valor_aluguel: midia.classificacao_interna.valor_aluguel,
        classificacao: midia.classificacao_interna.descricao,
        total_exemplares: midia.exemplares.count,
        exemplares_disponiveis: Exemplar.count_disponiveis(midia.id),
        disponiveis_para_locacao: Exemplar.quantidade_disponivel_para_locacao(midia.id),
        em_estoque: Exemplar.tem_estoque?(midia.id)
      }
    end

    render json: resultado
  end

  # GET /disponibilidade/:midia_id
  # Retorna disponibilidade detalhada de uma mídia específica
  def show
    midia = Midium.includes(:classificacao_interna, :exemplares, :genero, :tipo).find(params[:id])

    exemplares = midia.exemplares.map do |ex|
      {
        codigo_interno: ex.codigo_interno,
        disponivel: ex.disponivel,
        em_locacao_ativa: ex.em_locacao_ativa?
      }
    end

    render json: {
      midia: {
        id: midia.id,
        titulo: midia.titulo,
        ano_lancamento: midia.ano_lancamento,
        duracao_em_minutos: midia.duracao_em_minutos,
        genero: midia.genero.descricao,
        tipo: midia.tipo.descricao,
        classificacao: midia.classificacao_interna.descricao,
        valor_aluguel: midia.classificacao_interna.valor_aluguel
      },
      disponibilidade: {
        total_exemplares: exemplares.count,
        exemplares_disponiveis: Exemplar.count_disponiveis(midia.id),
        disponiveis_para_locacao: Exemplar.quantidade_disponivel_para_locacao(midia.id),
        em_estoque: Exemplar.tem_estoque?(midia.id)
      },
      exemplares: exemplares
    }
  rescue ActiveRecord::RecordNotFound
    render json: { errors: ["Mídia não encontrada"] }, status: :not_found
  end
end