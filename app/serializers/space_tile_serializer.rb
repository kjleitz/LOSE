class SpaceTileSerializer < ActiveModel::Serializer
  attributes :id, :coord_string, :x, :y, :star_map

  has_one  :discoverer
  has_many :planets
  has_many :asteroids
  has_many :wrecks
end
