class ClassificacaoInternasController < ApplicationController
  before_action :set_classificacao_interna, only: %i[ show edit update destroy ]

  # GET /classificacao_internas or /classificacao_internas.json
  def index
    @classificacao_internas = ClassificacaoInterna.all
  end

  # GET /classificacao_internas/1 or /classificacao_internas/1.json
  def show
  end

  # GET /classificacao_internas/new
  def new
    @classificacao_interna = ClassificacaoInterna.new
  end

  # GET /classificacao_internas/1/edit
  def edit
  end

  # POST /classificacao_internas or /classificacao_internas.json
  def create
    @classificacao_interna = ClassificacaoInterna.new(classificacao_interna_params)

    respond_to do |format|
      if @classificacao_interna.save
        format.html { redirect_to @classificacao_interna, notice: "Classificacao interna was successfully created." }
        format.json { render :show, status: :created, location: @classificacao_interna }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @classificacao_interna.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /classificacao_internas/1 or /classificacao_internas/1.json
  def update
    respond_to do |format|
      if @classificacao_interna.update(classificacao_interna_params)
        format.html { redirect_to @classificacao_interna, notice: "Classificacao interna was successfully updated.", status: :see_other }
        format.json { render :show, status: :ok, location: @classificacao_interna }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @classificacao_interna.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /classificacao_internas/1 or /classificacao_internas/1.json
  def destroy
    @classificacao_interna.destroy!

    respond_to do |format|
      format.html { redirect_to classificacao_internas_path, notice: "Classificacao interna was successfully destroyed.", status: :see_other }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_classificacao_interna
      @classificacao_interna = ClassificacaoInterna.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def classificacao_interna_params
      params.fetch(:classificacao_interna, {})
    end
end
