class WreckSerializer < ActiveModel::Serializer
  attributes :id, :description, :quality
  has_one :ship
  has_one :space_tile
end
