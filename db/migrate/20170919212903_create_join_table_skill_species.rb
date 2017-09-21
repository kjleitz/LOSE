class CreateJoinTableSkillSpecies < ActiveRecord::Migration[5.1]
  def change
    create_join_table :skills, :species do |t|
      t.references :skill,   foreign_key: true, index: true
      t.references :species, foreign_key: true, index: true
    end
  end
end
