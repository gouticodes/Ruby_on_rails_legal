class DashboardController < ApplicationController
  def index
    @metrics = {
      open_cases: LegalCase.where(status: 'open').count,
      upcoming_hearings: Hearing.where('scheduled_at > ?', Time.current).count,
      active_clients: Client.active.count,
      documents_uploaded: CaseDocument.count
    }

    @recent_cases = LegalCase.order(updated_at: :desc).limit(5)

    respond_to do |format|
      format.html
      format.json do
        render json: {
          metrics: @metrics,
          recent_cases: @recent_cases.as_json(include: :client, methods: [:client_name])
        }
      end
    end
  end
end
