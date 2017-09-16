class CreateJoinTableNationSpecies < ActiveRecord::Migration[5.1]
  def change
    create_join_table :nations, :species do |t|
      t.index [:nation_id, :species_id]
      t.index [:species_id, :nation_id]
    end
  end
end
