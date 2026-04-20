class Hearing < ApplicationRecord
  belongs_to :legal_case

  validates :scheduled_at, :courtroom, presence: true
end
