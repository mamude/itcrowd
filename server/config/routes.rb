Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      get 'roles', to: 'roles#index'
      get 'countries', to: 'countries#index'
      resources :people do
        collection do
          post 'search', to: 'people#search'
          post 'autocomplete', to: 'people#autocomplete'
        end
      end
      resources :movies do
        collection do
          post 'search', to: 'movies#search'
          post '/:id/add_person', to: 'movies#add_person'
          delete '/:id/remove_person', to: 'movies#remove_person'
        end
      end
      post '/authentication', to: 'sessions#create'
      delete '/logout', to: 'sessions#destroy'
    end
  end
end
