class CreateSpecies < ActiveRecord::Migration[5.1]
  def change
    create_table :species do |t|
      t.string :name
      t.belongs_to :homeworld, foreign_key: true
      t.text :description
      t.belongs_to :skill, foreign_key: true
      t.integer :ugliness

      t.timestamps
    end
  end
end
