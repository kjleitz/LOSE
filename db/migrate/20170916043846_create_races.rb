class CreateRaces < ActiveRecord::Migration[5.1]
  def change
    create_table :races do |t|
      t.string :name
      t.belongs_to :species, foreign_key: true
      t.integer :social_status
      t.text :description
      t.belongs_to :skill, foreign_key: true

      t.timestamps
    end
  end
end
