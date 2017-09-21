class CreateJoinTablePersonSpaceship < ActiveRecord::Migration[5.1]
  def change
    create_join_table :people, :spaceships do |t|
      t.references :person,    foreign_key: true, index: true
      t.references :spaceship, foreign_key: true, index: true
    end
  end
end
