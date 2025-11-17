class GenerosController < ApplicationController
  before_action :set_genero, only: %i[show update destroy]

  # GET /generos
  def index
    generos = Genero.all
    render json: generos
  end

  # GET /generos/1
  def show
    render json: @genero
  end

  # POST /generos
  def create
    genero = Genero.new(genero_params)

    if genero.save
      render json: genero, status: :created
    else
      render json: genero.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /generos/1
  def update
    if @genero.update(genero_params)
      render json: @genero, status: :ok
    else
      render json: @genero.errors, status: :unprocessable_entity
    end
  end

  # DELETE /generos/1
  def destroy
    @genero.destroy!
    head :no_content
  end

  private

  def set_genero
    @genero = Genero.find(params[:id])
  end

  def genero_params
    params.require(:genero).permit(:nome) # AJUSTAR CONFORME TABELA
  end
end
