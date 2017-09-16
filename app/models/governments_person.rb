class GovernmentsPerson < ApplicationRecord
  belongs_to :government
  belongs_to :person
end
