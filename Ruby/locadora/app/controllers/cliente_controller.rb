class ClienteController < ApplicationController
	def index
		@clientes = Cliente.all
		render json: @clientes
  end

   def show
	  @cliente = Cliente.find(params[:id])
	  render json: @cliente
   end

  def create
   	@cliente = Cliente.new(cliente_params)
    if @cliente.save
       render json: @cliente
    else
       render json: @cliente.errors, status: :unprocessable_entity
    end
   end

   def update
   	@cliente = Cliente.find(params[:id])
    if @cliente.update(cliente_params)
       render json: @cliente
    else
       render json: @cliente.errors, status: :unprocessable_entity
    end
   end

   def destroy
	   @cliente = Cliente.find(params[:id])
	   @cliente.destroy
	   head :no_content
   end
end
