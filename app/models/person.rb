class Person < ApplicationRecord
  belongs_to :race
  belongs_to :species
  belongs_to :spaceship
  belongs_to :skill
  belongs_to :planet
  belongs_to :alignment
  belongs_to :occupation
end
