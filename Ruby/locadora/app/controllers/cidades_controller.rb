class CidadesController < ApplicationController
  before_action :set_cidade, only: [:show, :update, :destroy]

  # GET /cidades
  def index
    render json: Cidade.all
  end

  # GET /cidades/:id
  def show
    render json: @cidade
  end

  # POST /cidades
  def create
    cidade = Cidade.new(cidade_params)

    if cidade.save
      render json: cidade, status: :created
    else
      render json: cidade.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /cidades/:id
  def update
    if @cidade.update(cidade_params)
      render json: @cidade
    else
      render json: @cidade.errors, status: :unprocessable_entity
    end
  end

  # DELETE /cidades/:id
  def destroy
    @cidade.destroy
    head :no_content
  end

  private

  def set_cidade
    @cidade = Cidade.find(params[:id])
  end

  def cidade_params
    params.require(:cidade).permit(:nome, :estado_id) # AJUSTAR CONFORME TABELA
  end
end
