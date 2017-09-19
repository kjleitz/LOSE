class Government < ApplicationRecord
  belongs_to :leader, class_name: 'Person', foreign_key: :person_id
end
