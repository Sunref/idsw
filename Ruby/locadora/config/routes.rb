Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  get '/favicon.ico', to: proc { [204, {}, []] }

  resources :cliente, controller: 'cliente'
  resources :cidade, controller: 'cidade'
  resources :estados
  resources :ator, controller: 'ator'
  resources :genero, controller: 'genero'
  resources :classificacao_etarium, path: 'classificacao_etaria', controller: 'classificacao_etarium'
  resources :tipo, path: 'tipo', controller: 'tipo'
  resources :classificacao_interna, path: 'classificacao_interna', controller: 'classificacao_interna'
  resources :midium, controller: 'midium'
  resources :exemplar, controller: 'exemplar'

  resources :locacao, controller: 'locacao' do
    resources :item_locacao, only: [:create, :destroy, :index], controller: 'item_locacao'
  end


  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  root to: 'cliente#index'
end
