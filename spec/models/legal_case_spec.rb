require 'rails_helper'

RSpec.describe LegalCase, type: :model do
  subject(:legal_case) { build(:legal_case) }

  it 'is valid with valid attributes' do
    expect(legal_case).to be_valid
  end

  it 'requires a case_number' do
    legal_case.case_number = nil
    expect(legal_case).not_to be_valid
  end

  it 'allows only known statuses' do
    legal_case.status = 'unknown'
    expect(legal_case).not_to be_valid
  end
end
