class Species < ApplicationRecord
  belongs_to :planet
  belongs_to :skill
end
