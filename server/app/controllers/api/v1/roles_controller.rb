class Api::V1::RolesController < ApplicationController
  # @route GET /api/v1/roles (api_v1_roles)
  def index
    roles = Role.all.order('name ASC')
    render json: roles
  end
end
