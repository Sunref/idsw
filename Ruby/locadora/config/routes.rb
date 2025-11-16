Rails.application.routes.draw do
	# Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  resources :clientes
  resources :cidades
  resources :estados
  resources :atores
  resources :generos
  resources :classificacoes_etarias, path: 'classificacao_etaria'
  resources :tipos, path: 'tipo'
  resources :classificacoes_internas, path: 'classificacao_interna'
  resources :midias
  resources :locacoes
  resources :exemplares
  resources :locacoes do
  resources :item_locacoes, only: [:create, :destroy, :index]
  end

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
  root to: 'clientes#index'
end
