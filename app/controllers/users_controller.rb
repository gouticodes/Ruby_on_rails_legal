class UsersController < ApplicationController
  def index
    users = Client.order(:name).map do |client|
      {
        id: client.id,
        name: client.name,
        email: client.email,
        role: 'Client'
      }
    end

    render json: users
  end
end
