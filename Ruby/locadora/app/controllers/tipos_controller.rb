class TiposController < ApplicationController
  before_action :set_tipo, only: %i[ show update destroy ]

  # GET /tipos
  def index
    render json: Tipo.all
  end

  # GET /tipos/:id
  def show
    render json: @tipo
  end

  # POST /tipos
  def create
    tipo = Tipo.new(tipo_params)

    if tipo.save
      render json: tipo, status: :created
    else
      render json: { errors: tipo.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /tipos/:id
  def update
    if @tipo.update(tipo_params)
      render json: @tipo, status: :ok
    else
      render json: { errors: @tipo.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /tipos/:id
  def destroy
    @tipo.destroy
    head :no_content
  end

  private
    def set_tipo
      @tipo = Tipo.find(params[:id])
    end

    def tipo_params
      params.require(:tipo).permit(:nome, :descricao)
    end
end
