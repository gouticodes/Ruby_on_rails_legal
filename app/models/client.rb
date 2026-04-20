class Client < ApplicationRecord
  has_many :legal_cases, dependent: :destroy

  validates :name, :email, presence: true

  scope :active, -> { where(active: true) }
end
