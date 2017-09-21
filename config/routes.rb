Rails.application.routes.draw do
  root 'universe#canvas'

  resources :governments_people
  resources :governments
  resources :nations
  resources :occupations
  resources :alignments
  resources :planets
  resources :skills
  resources :species
  resources :races
  resources :people
  resources :spaceships
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
