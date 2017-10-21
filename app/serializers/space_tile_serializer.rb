class SpaceTileSerializer < ActiveModel::Serializer
  attributes :id, :coord_string, :x, :y, :discoverer_id
end
