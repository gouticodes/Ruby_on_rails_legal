class LegalCasesController < ApplicationController
  before_action :set_legal_case, only: %i[show edit update destroy]

  def index
    @legal_cases = LegalCase.includes(:client).order(created_at: :desc)
    respond_to do |format|
      format.html
      format.json { render json: @legal_cases.as_json(include: :client) }
    end
  end

  def show
    respond_to do |format|
      format.html
      format.json { render json: @legal_case.as_json(include: :client) }
    end
  end

  def new
    @legal_case = LegalCase.new
  end

  def create
    @legal_case = LegalCase.new(legal_case_params)
    respond_to do |format|
      if @legal_case.save
        format.html { redirect_to @legal_case, notice: 'Case created successfully.' }
        format.json { render json: @legal_case, status: :created }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: { errors: @legal_case.errors.full_messages }, status: :unprocessable_entity }
      end
    end
  end

  def edit; end

  def update
    respond_to do |format|
      if @legal_case.update(legal_case_params)
        format.html { redirect_to @legal_case, notice: 'Case updated successfully.' }
        format.json { render json: @legal_case }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: { errors: @legal_case.errors.full_messages }, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @legal_case.destroy
    respond_to do |format|
      format.html { redirect_to legal_cases_path, notice: 'Case removed.' }
      format.json { head :no_content }
    end
  end

  private

  def set_legal_case
    @legal_case = LegalCase.find(params[:id])
  end

  def legal_case_params
    params.require(:legal_case).permit(:title, :case_number, :jurisdiction, :status, :client_id, :summary)
  end
end
