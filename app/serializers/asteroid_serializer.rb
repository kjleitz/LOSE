class AsteroidSerializer < ActiveModel::Serializer
  attributes :id, :description, :inventory, :size
  has_one :space_tile
end
