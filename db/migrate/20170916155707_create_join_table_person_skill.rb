class CreateJoinTablePersonSkill < ActiveRecord::Migration[5.1]
  def change
    create_join_table :people, :skills do |t|
      t.index [:person_id, :skill_id]
      t.index [:skill_id, :person_id]
    end
  end
end
