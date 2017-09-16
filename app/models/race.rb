class Race < ApplicationRecord
  belongs_to :species
  belongs_to :skill
end
