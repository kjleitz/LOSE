class Asteroid < ApplicationRecord
  belongs_to :space_tile

  serialize :inventory, JSON

  validates :x,           presence: true
  validates :y,           presence: true
  validates :size,        presence: true
  validates :description, presence: true

  enum size: {
    meteoroid: 0, # May or may not burn up in Earth's atmosphere. Take it aboard!
    minor:     1, # Under 1 km in diameter
    medium:    2, # Suitable for a single temporary mining base
    large:     3, # Suitable for multiple, possibly semi-permanent, mining bases
    planetoid: 4  # Large enough to have rounded somewhat under its own gravity
  }

  DESCRIPTIONS = {
    0 => "Just a space rock. Like Bowie used to do, but more boring.",
    1 => "Minor asteroids are like cats: big, hard, and mostly composed of mundane metals.",
    2 => "Smells like home. Might be able to set up a mining base here.",
    3 => "This is quite a find! Invite the whole family, chow down on some minerals.",
    4 => "That's what she said."
  }

  def self.new_random
    zero   = 20.times.map { 0 }
    one    = 15.times.map { 1 }
    two    = 10.times.map { 2 }
    three  = 5.times.map  { 3 }
    four   = 1.times.map  { 4 }
    size   = [zero, one, two, three, four].flatten.sample
    desc   = DESCRIPTIONS[size]

    new(
      x:           rand(0..100),
      y:           rand(0..100),
      size:        size,
      description: desc,
      inventory:   []
    )
  end
end
