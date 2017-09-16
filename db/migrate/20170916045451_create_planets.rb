class CreatePlanets < ActiveRecord::Migration[5.1]
  def change
    create_table :planets do |t|
      t.string :name
      t.integer :class
      t.integer :size
      t.text :atmosphere
      t.bigint :population
      t.text :description

      t.timestamps
    end
  end
end
