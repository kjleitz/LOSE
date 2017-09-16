Rails.application.routes.draw do
  resources :planets
  resources :skills
  resources :species
  resources :races
  resources :people
  resources :spaceships
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
