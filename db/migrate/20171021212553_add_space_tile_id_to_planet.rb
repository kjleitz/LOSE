class AddSpaceTileIdToPlanet < ActiveRecord::Migration[5.1]
  def change
    add_reference :planets, :space_tile, foreign_key: true
  end
end
