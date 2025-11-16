class ClienteController < ApplicationController
 before_action :set_cliente, only: %i[ show edit update destroy ]

  def index
    @clientes = Cliente.all.order(:id)
  end

  def show
  end

  def new
    @cliente = Cliente.new
    @cidades = Cidade.all
  end

  def edit
    @cidades = Cidade.all
  end

  def create
    @cliente = Cliente.new(cliente_params)
    if @cliente.save
      redirect_to @cliente, notice: 'Cliente criado com sucesso.'
    else
      @cidades = Cidade.all
      render :new
    end
  end

  def update
    if @cliente.update(cliente_params)
      redirect_to @cliente, notice: 'Cliente atualizado com sucesso.'
    else
      @cidades = Cidade.all
      render :edit
    end
  end

  def destroy
    @cliente.destroy
    redirect_to clientes_url, notice: 'Cliente removido.'
  end

  private

  def set_cliente
    @cliente = Cliente.find(params[:id])
  end

  def cliente_params
    params.require(:cliente).permit(:nome, :sobrenome, :data_nascimento, :cpf, :email, :logradouro, :numero, :bairro, :cep, :cidade_id)
  end
end
