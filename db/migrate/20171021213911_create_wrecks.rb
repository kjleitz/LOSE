class CreateWrecks < ActiveRecord::Migration[5.1]
  def change
    create_table :wrecks do |t|
      t.belongs_to :ship,       foreign_key: true
      t.belongs_to :space_tile, foreign_key: true
      t.text       :description
      t.integer    :quality

      t.timestamps
    end
  end
end
