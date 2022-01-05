Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :tasks
      resources :tags, only: [:index, :destroy]
      get 'today', to: 'tasks#today'
      get 'tomorrow', to: 'tasks#tomorrow'
    end
  end
  root 'home#index'
  get '/*path' => 'home#index'
end
