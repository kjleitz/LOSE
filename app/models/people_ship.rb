class PeopleShip < ApplicationRecord
  belongs_to :ship
  belongs_to :person
end
