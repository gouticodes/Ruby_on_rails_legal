module Api
  class CasesController < ApplicationController
    before_action :set_case, only: %i[update destroy]

    def index
      cases = LegalCase.includes(:client).order(created_at: :desc).map { |legal_case| serialize_case(legal_case) }
      render json: cases
    end

    def create
      legal_case = LegalCase.new(case_params)

      if legal_case.save
        render json: serialize_case(legal_case), status: :created
      else
        render json: { errors: legal_case.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def update
      if @legal_case.update(case_params)
        render json: serialize_case(@legal_case)
      else
        render json: { errors: @legal_case.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def destroy
      @legal_case.destroy
      head :no_content
    end

    private

    def set_case
      @legal_case = LegalCase.find(params[:id])
    end

    def case_params
      params.permit(:title, :case_number, :jurisdiction, :status, :client_id, :summary)
    end

    def serialize_case(legal_case)
      {
        id: legal_case.id,
        title: legal_case.title,
        case_number: legal_case.case_number,
        jurisdiction: legal_case.jurisdiction,
        status: legal_case.status,
        client_id: legal_case.client_id,
        assigned_user: legal_case.client&.name,
        summary: legal_case.summary
      }
    end
  end
end
