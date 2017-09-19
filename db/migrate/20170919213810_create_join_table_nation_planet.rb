class CreateJoinTableNationPlanet < ActiveRecord::Migration[5.1]
  def change
    create_join_table :nations, :planets do |t|
      t.references :nation, foreign_key: true, index: true
      t.references :planet, foreign_key: true, index: true
    end
  end
end
