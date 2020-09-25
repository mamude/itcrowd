class Api::V1::SessionsController < ApplicationController
  before_action :is_authenticaded, only: [:destroy]

  def create
    user = User.find_by_username(params[:username])
    if user && user.authenticate(params[:password])
      token = encode_token({user_id: user.id, username: user.username})
      user.update_attributes(token: token)
      render json: { message: "Welcome, #{user.username}", token: token }
    else
      render json: { error: 'Invalid username or password'}, status: :bad_request
    end
  end

  def destroy
    user = logged_user
    user.update_attributes(token: nil)
    head :no_content
  end
end
