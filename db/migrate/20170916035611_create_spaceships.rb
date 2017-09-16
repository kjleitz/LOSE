class CreateSpaceships < ActiveRecord::Migration[5.1]
  def change
    create_table :spaceships do |t|
      t.string     :name
      t.string     :type
      t.string     :size
      t.integer    :hp
      t.integer    :shield_strength
      t.integer    :energy
      t.integer    :ammo
      t.integer    :rockets
      t.string     :fuel_type
      t.integer    :reputation
      t.integer    :capacity
      t.integer    :cost
      t.belongs_to :user,            foreign_key: true
      t.belongs_to :nation,          foreign_key: true

      t.timestamps
    end
  end
end
