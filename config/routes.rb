Rails.application.routes.draw do
  resources :asteroids
  resources :wrecks
  resources :space_tiles, param: :coord_string
  root 'universe#app'

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
  resources :ships
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
