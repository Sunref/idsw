class ClassificacaoInternasController < ApplicationController
  before_action :set_classificacao_interna, only: %i[show update destroy]

  # GET /classificacao_internas
  def index
    classificacoes = ClassificacaoInterna.all
    render json: classificacoes
  end

  # GET /classificacao_internas/1
  def show
    render json: @classificacao_interna
  end

  # POST /classificacao_internas
  def create
    classificacao = ClassificacaoInterna.new(classificacao_interna_params)

    if classificacao.save
      render json: classificacao, status: :created
    else
      render json: classificacao.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /classificacao_internas/1
  def update
    if @classificacao_interna.update(classificacao_interna_params)
      render json: @classificacao_interna, status: :ok
    else
      render json: @classificacao_interna.errors, status: :unprocessable_entity
    end
  end

  # DELETE /classificacao_internas/1
  def destroy
    @classificacao_interna.destroy!
    head :no_content
  end

  private

  def set_classificacao_interna
    @classificacao_interna = ClassificacaoInterna.find(params[:id])
  end

  def classificacao_interna_params
    params.require(:classificacao_interna).permit(
      :nome,
      :descricao
    ) # AJUSTAR CONFORME TABELA
  end
end
