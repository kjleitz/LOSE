class CreateJoinTableNationSpecies < ActiveRecord::Migration[5.1]
  def change
    create_join_table :nations, :species do |t|
      t.references :nation,  foreign_key: true, index: true
      t.references :species, foreign_key: true, index: true
    end
  end
end
