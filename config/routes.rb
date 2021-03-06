Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :tasks
      resources :tags, only: [:index, :destroy]
      resources :users, only: [:create, :index]
      get '/get_tag_list/:id', to: 'tags#get_tag_list'
    end
  end
  root 'home#index'
  get '/*path' => 'home#index'
end
