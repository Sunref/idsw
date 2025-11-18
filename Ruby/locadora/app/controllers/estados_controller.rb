class EstadosController < ApplicationController
  before_action :set_estado, only: %i[show update destroy]

  # GET /estados
  def index
    estados = Estado.all
    render json: estados
  end

  # GET /estados/:id
  def show
    render json: @estado
  end

  # POST /estados
  def create
    estado = Estado.new(estado_params)

    if estado.save
      render json: estado, status: :created
    else
      render json: estado.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /estados/:id
  def update
    if @estado.update(estado_params)
      render json: @estado, status: :ok
    else
      render json: @estado.errors, status: :unprocessable_entity
    end
  end

  # DELETE /estados/:id
  def destroy
    @estado.destroy!
    head :no_content
  end

  private
  def set_estado
    @estado = Estado.find(params[:id])
  end

  # strong params
  def estado_params
    params.require(:estado).permit(:nome, :sigla)
  end
end
