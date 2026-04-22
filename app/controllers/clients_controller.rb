class ClientsController < ApplicationController
  before_action :set_client, only: %i[show edit update destroy]

  def index
    @clients = Client.order(:name)
    respond_to do |format|
      format.html
      format.json { render json: @clients }
    end
  end

  def show
    respond_to do |format|
      format.html
      format.json { render json: @client }
    end
  end

  def new
    @client = Client.new
  end

  def create
    @client = Client.new(client_params)
    respond_to do |format|
      if @client.save
        format.html { redirect_to @client, notice: 'Client created successfully.' }
        format.json { render json: @client, status: :created }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: { errors: @client.errors.full_messages }, status: :unprocessable_entity }
      end
    end
  end

  def edit; end

  def update
    respond_to do |format|
      if @client.update(client_params)
        format.html { redirect_to @client, notice: 'Client updated successfully.' }
        format.json { render json: @client }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: { errors: @client.errors.full_messages }, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @client.destroy
    respond_to do |format|
      format.html { redirect_to clients_path, notice: 'Client removed.' }
      format.json { head :no_content }
    end
  end

  private

  def set_client
    @client = Client.find(params[:id])
  end

  def client_params
    params.require(:client).permit(:name, :email, :phone, :active)
  end
end
