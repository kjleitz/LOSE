class CreatePersonnels < ActiveRecord::Migration[5.1]
  def change
    create_table :personnels do |t|
      t.string :name
      t.integer :age
      t.integer :weight
      t.integer :attractiveness
      t.belongs_to :race, foreign_key: true
      t.integer :intelligence
      t.integer :strength
      t.integer :dexterity
      t.integer :wisdom
      t.integer :speed
      t.integer :charisma
      t.integer :constitution
      t.integer :health
      t.string :gender
      t.belongs_to :spaceship, foreign_key: true
      t.belongs_to :skill, foreign_key: true
      t.integer :willpower

      t.timestamps
    end
  end
end
