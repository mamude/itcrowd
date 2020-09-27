class Api::V1::SessionsController < ApplicationController
  before_action :is_authenticaded, only: [:destroy]

  # @route POST /api/v1/authentication (api_v1_authentication)
  def create
    user = User.find_by_username(params[:username])
    if user && user.authenticate(params[:password])
      token = encode_token({user_id: user.id, username: user.username})
      user.update_attributes(token: token)
      render json: { message: "Welcome, #{user.username}", username: user.username, token: token }
    else
      render json: { error: 'Invalid username or password'}, status: :bad_request
    end
  end

  # @route DELETE /api/v1/logout (api_v1_logout)
  def destroy
    user = logged_user
    user.update_attributes(token: nil)
    head :no_content
  end
end
