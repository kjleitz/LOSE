class Personnel < ApplicationRecord
  belongs_to :race
  belongs_to :spaceship
  belongs_to :skill
end
