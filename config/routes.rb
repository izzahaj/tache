Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :tasks
      resources :tags, only: [:index, :destroy]
      resources :users, only: [:create, :index]
      get 'today', to: 'tasks#today'
      get 'tomorrow', to: 'tasks#tomorrow'
      get '/get_tag_list/:id', to: 'tags#get_tag_list'
      post '/login', to: 'auth#login'
      get '/auto_login', to: 'auth#auto_login'
    end
  end
  root 'home#index'
  get '/*path' => 'home#index'
end
