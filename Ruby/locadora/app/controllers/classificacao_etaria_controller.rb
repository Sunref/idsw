class ClassificacaoEtariaController < ApplicationController
  before_action :set_classificacao_etarium, only: %i[show update destroy]

  # GET /classificacao_etaria
  def index
    classificacoes = ClassificacaoEtarium.all
    render json: classificacoes
  end

  # GET /classificacao_etaria/:id
  def show
    render json: @classificacao_etarium
  end

  # POST /classificacao_etaria
  def create
    classificacao = ClassificacaoEtarium.new(classificacao_etarium_params)

    if classificacao.save
      render json: classificacao, status: :created
    else
      render json: classificacao.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /classificacao_etaria/:id
  def update
    if @classificacao_etarium.update(classificacao_etarium_params)
      render json: @classificacao_etarium, status: :ok
    else
      render json: @classificacao_etarium.errors, status: :unprocessable_entity
    end
  end

  # DELETE /classificacao_etaria/:id
  def destroy
    @classificacao_etarium.destroy!
    head :no_content
  end

  private
  def set_classificacao_etarium
    @classificacao_etarium = ClassificacaoEtarium.find(params[:id])
  end

  def classificacao_etarium_params
    params.require(:classificacao_etarium).permit(:descricao)
  end
end
