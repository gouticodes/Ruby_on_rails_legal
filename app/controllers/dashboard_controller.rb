class DashboardController < ApplicationController
  def index
    @metrics = {
      open_cases: LegalCase.where(status: 'open').count,
      upcoming_hearings: Hearing.where('scheduled_at > ?', Time.current).count,
      active_clients: Client.active.count,
      documents_uploaded: CaseDocument.count
    }

    @recent_cases = LegalCase.order(updated_at: :desc).limit(5)
  end
end
