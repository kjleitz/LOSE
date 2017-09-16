class PeopleSpaceship < ApplicationRecord
  belongs_to :spaceship
  belongs_to :person
end
