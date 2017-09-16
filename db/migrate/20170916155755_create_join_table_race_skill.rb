class CreateJoinTableRaceSkill < ActiveRecord::Migration[5.1]
  def change
    create_join_table :races, :skills do |t|
      t.index [:race_id, :skill_id]
      t.index [:skill_id, :race_id]
    end
  end
end
