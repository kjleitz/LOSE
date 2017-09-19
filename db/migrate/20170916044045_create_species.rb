class CreateSpecies < ActiveRecord::Migration[5.1]
  def change
    create_table :species do |t|
      t.string     :name
      t.text       :description
      t.integer    :ugliness
      t.belongs_to :planet,     foreign_key: true

      t.timestamps
    end
  end
end
