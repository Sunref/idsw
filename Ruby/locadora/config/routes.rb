Rails.application.routes.draw do
  # API resources only
  resources :item_locacaos
  resources :exemplars
  resources :locacaos
  resources :midia
  resources :classificacao_internas
  resources :tipos
  resources :classificacao_etaria
  resources :generos
  resources :ators
  resources :clientes
  resources :cidades

  # Health check endpoint
  get "up", to: "rails/health#show"
end
