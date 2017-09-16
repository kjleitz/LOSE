class CreateOccupations < ActiveRecord::Migration[5.1]
  def change
    create_table :occupations do |t|
      t.string :name
      t.text :description
      t.boolean :shipworthy
      t.integer :social_status
      t.integer :salary

      t.timestamps
    end
  end
end
