class CreateGovernments < ActiveRecord::Migration[5.1]
  def change
    create_table :governments do |t|
      t.string :type
      t.integer :freedom_axis
      t.integer :equality_axis
      t.belongs_to :person, foreign_key: true, optional: true

      t.timestamps
    end
  end
end
