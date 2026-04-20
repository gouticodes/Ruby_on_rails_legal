class CaseDocument < ApplicationRecord
  belongs_to :legal_case

  validates :name, :document_type, :storage_url, presence: true
end
