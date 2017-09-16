class CreatePeopleSpaceships < ActiveRecord::Migration[5.1]
  def change
    create_table :people_spaceships do |t|
      t.belongs_to :spaceship, foreign_key: true
      t.belongs_to :person, foreign_key: true

      t.timestamps
    end
  end
end
