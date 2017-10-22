class Wreck < ApplicationRecord
  belongs_to :ship
  belongs_to :space_tile
end
