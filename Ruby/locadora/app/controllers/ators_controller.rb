class AtorsController < ApplicationController
  before_action :set_ator, only: [:show, :update, :destroy]

  # GET /ators
  def index
    render json: Ator.all
  end

  # GET /ators/:id
  def show
    render json: @ator
  end

  # POST /ators
  def create
    ator = Ator.new(ator_params)

    if ator.save
      render json: ator, status: :created
    else
      render json: ator.errors, status: :unprocessable_entity
    end
  end

  # PUT/PATCH /ators/:id
  def update
    if @ator.update(ator_params)
      render json: @ator
    else
      render json: @ator.errors, status: :unprocessable_entity
    end
  end

  # DELETE /ators/:id
  def destroy
    @ator.destroy
    head :no_content
  end

  private
  def set_ator
    @ator = Ator.find(params[:id])
  end

  def ator_params
    params.require(:ator).permit(:nome, :sobrenome, :data_estreia)
  end
end
