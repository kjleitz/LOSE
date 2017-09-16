class PeopleSkill < ApplicationRecord
  belongs_to :person
  belongs_to :skill
end
