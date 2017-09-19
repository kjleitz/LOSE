class CreateJoinTableRaceSkill < ActiveRecord::Migration[5.1]
  def change
    create_join_table :races, :skills do |t|
      t.references :race,  foreign_key: true, index: true
      t.references :skill, foreign_key: true, index: true
    end
  end
end
