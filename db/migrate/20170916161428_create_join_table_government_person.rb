class CreateJoinTableGovernmentPerson < ActiveRecord::Migration[5.1]
  def change
    create_join_table :governments, :people do |t|
      t.index [:government_id, :person_id]
      t.index [:person_id, :government_id]
    end
  end
end
