class GovernmentsPerson < ApplicationRecord
  # meant for members of government... probs unnecessary
  belongs_to :government
  belongs_to :person
end
