class CreateRacesSkills < ActiveRecord::Migration[5.1]
  def change
    create_table :races_skills do |t|
      t.belongs_to :race, foreign_key: true
      t.belongs_to :skill, foreign_key: true

      t.timestamps
    end
  end
end
