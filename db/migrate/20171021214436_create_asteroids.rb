class CreateAsteroids < ActiveRecord::Migration[5.1]
  def change
    create_table :asteroids do |t|
      t.belongs_to :space_tile, foreign_key: true
      t.text :description
      t.text :inventory
      t.integer :size

      t.timestamps
    end
  end
end
