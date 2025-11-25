class ExemplarsController < ApplicationController
  before_action :set_exemplar, only: %i[show update destroy]

  # GET /exemplars
  def index
    exemplars = Exemplar.includes(:midia).all
    render json: exemplars.as_json(include: { midia: { only: [:titulo] } })
  end

  # GET /exemplars/1
  def show
    render json: @exemplar
  end

  # POST /exemplars
  def create
    exemplar = Exemplar.new(exemplar_params)

    if exemplar.save
      render json: exemplar, status: :created
    else
      render json: exemplar.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /exemplars/1
  def update
    if @exemplar.update(exemplar_params)
      render json: @exemplar, status: :ok
    else
      render json: @exemplar.errors, status: :unprocessable_entity
    end
  end

  # DELETE /exemplars/1
  def destroy
    if @exemplar.em_locacao_ativa?
    return render json: {
        erro: "Não é possível excluir este exemplar pois está em locação ativa."
    }, status: :unprocessable_entity
    end

    if @exemplar.destroy
    	render json: { mensagem: "Exemplar excluído com sucesso." }, status: :ok
    else
    	render json: { erros: @exemplar.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def set_exemplar
    @exemplar = Exemplar.find(params[:codigo_interno])
  end

  def exemplar_params
    params.require(:exemplar).permit(:codigo_interno, :disponivel, :midia_id)
  end
end
