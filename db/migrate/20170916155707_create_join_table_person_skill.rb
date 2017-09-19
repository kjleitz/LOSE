class CreateJoinTablePersonSkill < ActiveRecord::Migration[5.1]
  def change
    create_join_table :people, :skills do |t|
      t.references :person, foreign_key: true, index: true
      t.references :skill,  foreign_key: true, index: true
    end
  end
end
