class CreateJoinTableGovernmentPerson < ActiveRecord::Migration[5.1]
  def change
    create_join_table :governments, :people do |t|
      t.references :government, foreign_key: true, index: true
      t.references :person,     foreign_key: true, index: true
    end
  end
end
