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
      render json: cliente.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /clientes/:id
  def update
    if @cliente.update(cliente_params)
      render json: @cliente, status: :ok
    else
      render json: @cliente.errors, status: :unprocessable_entity
    end
  end

  # DELETE /clientes/:id
  def destroy
    @cliente.destroy!
    head :no_content
  end

  private
  def set_cliente
    @cliente = Cliente.find(params[:id])
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
