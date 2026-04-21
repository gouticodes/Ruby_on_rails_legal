module Api
  class DocumentsController < ApplicationController
    def index
      documents = CaseDocument.includes(:legal_case).order(created_at: :desc).map do |document|
        {
          id: document.id,
          name: document.name,
          document_type: document.document_type,
          storage_url: document.storage_url,
          case_title: document.legal_case&.title
        }
      end

      render json: documents
    end
  end
end
