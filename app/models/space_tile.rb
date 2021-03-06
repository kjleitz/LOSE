class SpaceTile < ApplicationRecord
  TILES_PER_PLANET     = 50
  TILES_PER_ASTEROID   = 2
  TILES_PER_ENEMY_SHIP = 500
  TILES_PER_WORMHOLE   = 1000
  TILES_PER_WRECK      = 100
  STARS_PER_TILE       = 20

  belongs_to :discoverer, class_name: 'User', foreign_key: :user_id, optional: true
  has_many   :planets
  has_many   :asteroids
  has_many   :wrecks

  serialize :star_map, JSON

  validates :x, presence: true
  validates :y, presence: true

  before_create :set_coord_string
  before_create :generate_contents!

  class << self
    def at(*coords)
      find_by(coord_string: stringify_coords(coords))
    end

    def for(*coords)
      tile = at(coords)
      return tile if tile.present?
      create!(hashify_coords(coords))
    end
  end

  private

    def self.stringify_coords(*coord_params)
      coords = hashify_coords(coord_params)
      "#{coords[:x]},#{coords[:y]}"
    end

    def self.hashify_coords(*coord_params)
      params = coord_params.flatten
      if params.length > 1
        {
          x: params.first.to_i,
          y: params.second.to_i
        }
      elsif params.first.is_a? Hash
        {
          x: params.first[:x].to_i,
          y: params.first[:y].to_i
        }
      elsif params.first.is_a? String
        coords = params.first.split(',')
        {
          x: coords.first.to_i,
          y: coords.second.to_i
        }
      else
        raise ArgumentError.new("Args gotta be like: ('3,7'), (3, 7), ([3, 7]), (x: 3, y: 7), or ({x: 3, y: 7}), yo.")
      end
    end

    def set_coord_string
      self.coord_string ||= self.class.stringify_coords(x, y)
    end

    def generate_contents!
      # this goes in a before_create (yes, I know, I hate myself too)
      self.star_map ||= STARS_PER_TILE.times.map { { x: rand(0..100), y: rand(0..100) } }
      self.asteroids << Asteroid.new_random
    end

end
