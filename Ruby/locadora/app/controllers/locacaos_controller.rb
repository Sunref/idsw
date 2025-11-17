class LocacaosController < ApplicationController
  before_action :set_locacao, only: %i[ show update destroy ]

  # GET /locacaos
  def index
    render json: Locacao.all
  end

  # GET /locacaos/:id
  def show
    render json: @locacao
  end

  # POST /locacaos
  def create
    locacao = Locacao.new(locacao_params)

    if locacao.save
      render json: locacao, status: :created
    else
      render json: { errors: locacao.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /locacaos/:id
  def update
    if @locacao.update(locacao_params)
      render json: @locacao, status: :ok
    else
      render json: { errors: @locacao.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /locacaos/:id
  def destroy
    @locacao.destroy
    head :no_content
  end

  private

    def set_locacao
      @locacao = Locacao.find(params[:id])
    end

    def locacao_params
      params.require(:locacao).permit(
        :cliente_id,
        :data_locacao,
        :data_devolucao,
        :valor_total
      ) # AJUSTAR CONFORME TABELA
    end
end
