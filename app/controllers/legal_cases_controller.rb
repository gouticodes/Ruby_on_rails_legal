class LegalCasesController < ApplicationController
  before_action :set_legal_case, only: %i[show edit update destroy]

  def index
    @legal_cases = LegalCase.includes(:client).order(created_at: :desc)
  end

  def show; end

  def new
    @legal_case = LegalCase.new
  end

  def create
    @legal_case = LegalCase.new(legal_case_params)
    if @legal_case.save
      redirect_to @legal_case, notice: 'Case created successfully.'
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit; end

  def update
    if @legal_case.update(legal_case_params)
      redirect_to @legal_case, notice: 'Case updated successfully.'
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @legal_case.destroy
    redirect_to legal_cases_path, notice: 'Case removed.'
  end

  private

  def set_legal_case
    @legal_case = LegalCase.find(params[:id])
  end

  def legal_case_params
    params.require(:legal_case).permit(:title, :case_number, :jurisdiction, :status, :client_id, :summary)
  end
end
