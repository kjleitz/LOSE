class CreateAlignments < ActiveRecord::Migration[5.1]
  def change
    create_table :alignments do |t|
      t.string :lawfulness
      t.string :morality

      t.timestamps
    end
  end
end
