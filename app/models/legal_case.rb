class LegalCase < ApplicationRecord
  belongs_to :client
  has_many :case_documents, dependent: :destroy
  has_many :hearings, dependent: :destroy

  STATUSES = %w[open in_review hearing closed archived].freeze

  validates :title, :case_number, :jurisdiction, :status, presence: true
  validates :status, inclusion: { in: STATUSES }
  validates :case_number, uniqueness: true
end
