class Asteroid < ApplicationRecord
  belongs_to :space_tile

  enum size: {
    meteoroid: 0, # May or may not burn up in Earth's atmosphere. Take it aboard!
    minor:     1, # Under 1 km in diameter
    medium:    2, # Suitable for a single temporary mining base
    large:     3, # Suitable for multiple, possibly semi-permanent, mining bases
    planetoid: 4  # Large enough to have rounded somewhat under its own gravity
  }
end
