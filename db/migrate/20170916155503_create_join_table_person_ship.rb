class CreateJoinTablePersonShip < ActiveRecord::Migration[5.1]
  def change
    create_join_table :people, :ships do |t|
      t.references :person,    foreign_key: true, index: true
      t.references :ship, foreign_key: true, index: true
    end
  end
end
