class CreateJoinTablePersonSpaceship < ActiveRecord::Migration[5.1]
  def change
    create_join_table :people, :spaceships do |t|
      t.index [:spaceship_id, :task_id]
      t.index [:task_id, :spaceship_id]
    end
  end
end
