class ExemplarsController < ApplicationController
  before_action :set_exemplar, only: %i[show update destroy]

  # GET /exemplars
  def index
    exemplars = Exemplar.all
    render json: exemplars
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
    @exemplar.destroy!
    head :no_content
  end

  private
  def set_exemplar
    @exemplar = Exemplar.find(params[:id])
  end

  def exemplar_params
    params.require(:exemplar).permit(:codigo_interno, :disponivel, :midia_id)
  end
end
