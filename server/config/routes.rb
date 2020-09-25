Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      get '/people', to: 'people#index'
      get '/people/:id', to: 'people#show'
      put '/people/:id', to: 'people#update'
      delete '/people/:id', to: 'people#destroy'
      resources :movies do
        resources :people, except: [:index, :show, :update, :destroy] do
          collection do
            get 'all', to: 'people#all_by_movie'
            post 'actor', to: 'people#add_actor'
            post 'producer', to: 'people#add_producer'
            post 'director', to: 'people#add_director'
          end
        end
      end
      post '/authentication', to: 'sessions#create'
      delete '/logout', to: 'sessions#destroy'
    end
  end
end
