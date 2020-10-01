class Api::V1::RolesController < ApplicationController
  def index
    roles = Role.all.order('name ASC')
    render json: roles
  end
end
