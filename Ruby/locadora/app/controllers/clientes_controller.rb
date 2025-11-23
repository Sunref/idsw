class ClientesController < ApplicationController
  before_action :set_cliente, only: %i[show update destroy]

  # GET /clientes
  def index
    clientes = Cliente.all
    render json: clientes
  end

  # GET /clientes/:id
  def show
    render json: @cliente
  end

  # POST /clientes
  def create
    cliente = Cliente.new(cliente_params)

    if cliente.save
      render json: cliente, status: :created
    else
      render json: { errors: cliente.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /clientes/:id
  def update
    if @cliente.update(cliente_params)
      render json: @cliente, status: :ok
    else
      render json: { errors: @cliente.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /clientes/:id
  def destroy
    if @cliente.locacoes.any?
      render json: {
        errors: ["Não é possível excluir cliente com locações associadas"],
        locacoes_count: @cliente.locacoes.count
      }, status: :unprocessable_entity
    else
      @cliente.destroy!
      head :no_content
    end
  rescue ActiveRecord::InvalidForeignKey
    render json: {
      errors: ["Não é possível excluir cliente com registros associados"]
    }, status: :unprocessable_entity
  end

  private

  def set_cliente
    @cliente = Cliente.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { errors: ["Cliente não encontrado"] }, status: :not_found
  end

  def cliente_params
    params.require(:cliente).permit(
      :nome,
      :sobrenome,
      :data_nascimento,
      :cpf,
      :email,
      :logradouro,
      :numero,
      :bairro,
      :cep,
      :cidade_id
    )
  end
end