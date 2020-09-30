Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :countries, only: [:index]
      resources :people do
        collection do
          post 'search', to: 'people#search'
        end
      end
      resources :movies do
        collection do
          post 'search', to: 'movies#search'
        end
      end
      post '/authentication', to: 'sessions#create'
      delete '/logout', to: 'sessions#destroy'
    end
  end
end
