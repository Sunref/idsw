class MidiaController < ApplicationController
  before_action :set_midium, only: %i[ show update destroy ]

  # GET /midia
  def index
    render json: Midium.all
  end

  # GET /midia/:id
  def show
    render json: @midium
  end

  # POST /midia
  def create
    midium = Midium.new(midium_params)

    if midium.save
      render json: midium, status: :created
    else
      render json: { errors: midium.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /midia/:id
  def update
    if @midium.update(midium_params)
      render json: @midium, status: :ok
    else
      render json: { errors: @midium.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /midia/:id
  def destroy
    @midium.destroy
    head :no_content
  end

  private
    def set_midium
      @midium = Midium.find(params[:id])
    end

    def midium_params
      params.require(:midium).permit(
        :titulo,
        :ano_lancamento,
        :codigo_barras,
        :duracao_em_minutos,
        :ator_principal,
        :ator_coadjuvante,
        :genero_id,
        :classificacao_etaria_id,
        :tipo_id,
        :classificacao_interna_id
      )
    end
end
