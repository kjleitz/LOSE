class Spaceship < ApplicationRecord
  belongs_to :user
  belongs_to :nation, optional: true
end
