class CreateSpaceTiles < ActiveRecord::Migration[5.1]
  def change
    create_table :space_tiles do |t|
      t.integer    :x
      t.integer    :y
      t.text       :star_map
      t.string     :coord_string, index: true
      t.belongs_to :user,         foreign_key: true

      t.timestamps
    end
  end
end
