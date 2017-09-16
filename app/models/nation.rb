class Nation < ApplicationRecord
  belongs_to :alignment
  belongs_to :government
end
