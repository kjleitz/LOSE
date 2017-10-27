class AsteroidSerializer < ActiveModel::Serializer
  attributes :id, :x, :size, :y, :description, :inventory, :space_tile_id
end
