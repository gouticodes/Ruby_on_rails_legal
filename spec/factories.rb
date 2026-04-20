FactoryBot.define do
  factory :client do
    name { 'Acme Holdings' }
    email { 'legal@acme.com' }
    phone { '+1-555-0100' }
    active { true }
  end

  factory :legal_case do
    association :client
    title { 'Contract Dispute' }
    case_number { "LC-#{SecureRandom.hex(4).upcase}" }
    jurisdiction { 'New York' }
    status { 'open' }
    summary { 'B2B contract enforcement matter.' }
  end
end
