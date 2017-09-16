class CreateSpaceships < ActiveRecord::Migration[5.1]
  def change
    create_table :spaceships do |t|
      t.string     :name
      t.integer    :reputation
      t.integer    :capacity
      t.integer    :shield_strength
      t.integer    :hp
      t.string     :type
      t.integer    :cost
      t.integer    :energy
      t.integer    :ammo
      t.integer    :rockets
      t.string     :fuel_type
      t.string     :size
      t.belongs_to :user,            foreign_key: true

      t.timestamps
    end
  end
end
