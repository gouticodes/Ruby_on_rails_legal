require 'rails_helper'

RSpec.describe 'Health', type: :request do
  it 'serves the dashboard page' do
    get '/'
    expect(response).to have_http_status(:ok)
  end
end
