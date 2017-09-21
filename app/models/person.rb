class Person < ApplicationRecord
  belongs_to :race
  belongs_to :species
  belongs_to :spaceship
  belongs_to :nation
  belongs_to :alignment
  belongs_to :occupation
  belongs_to :homeworld, class_name: 'Planet', foreign_key: :planet_id
end
