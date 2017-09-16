class CreateNations < ActiveRecord::Migration[5.1]
  def change
    create_table :nations do |t|
      t.string :name
      t.text :description
      t.bigint :population
      t.belongs_to :alignment, foreign_key: true
      t.belongs_to :government, foreign_key: true

      t.timestamps
    end
  end
end
