class ItemLocacaosController < ApplicationController
  before_action :set_item_locacao, only: %i[ show update destroy ]

  # GET /item_locacaos
  def index
    render json: ItemLocacao.all
  end

  # GET /item_locacaos/:id
  def show
    render json: @item_locacao
  end

  # POST /item_locacaos
  def create
    item = ItemLocacao.new(item_locacao_params)

    if item.save
      render json: item, status: :created
    else
      render json: { errors: item.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /item_locacaos/:id
  def update
    if @item_locacao.update(item_locacao_params)
      render json: @item_locacao, status: :ok
    else
      render json: { errors: @item_locacao.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /item_locacaos/:id
  def destroy
    @item_locacao.destroy
    head :no_content
  end

  private
  def set_item_locacao
    @item_locacao = ItemLocacao.find_by!(
      locacao_id: params[:locacao_id],
      exemplar_codigo_interno: params[:exemplar_codigo_interno]
    )
  end

  def item_locacao_params
    params.require(:item_locacao).permit(:locacao_id, :exemplar_codigo_interno, :valor)
  end
end
