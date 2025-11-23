# config/routes.rb
Rails.application.routes.draw do
  # Rotas de locações
  resources :locacaos, path: 'locacoes' do
    member do
      post :finalizar  # POST /locacoes/:id/finalizar
    end

    collection do
      post :with_items  # POST /locacoes/with_items (cria um carrinho)
    end
  end

  # Rotas de clientes
  resources :clientes do
    member do
      get :status       # GET /clientes/:id/status
      get :atrasos      # GET /clientes/:id/atrasos
      get :historico    # GET /clientes/:id/historico
    end
  end

  # Rotas de disponibilidade
  get 'disponibilidade', to: 'disponibilidade#index'
  get 'disponibilidade/:id', to: 'disponibilidade#show'

  # Rotas básicas dos outros recursos
  resources :ators
  resources :cidades
  resources :classificacao_etaria
  resources :classificacao_internas
  resources :estados
  resources :exemplars, path: "exemplares", param: :codigo_interno
  resources :generos
  resources :item_locacaos, path: 'itens_locacao'
  resources :midia
  resources :tipos

  # Rota raiz
  root to: proc { [200, {}, ['API de Locadora de Mídias']] }
end