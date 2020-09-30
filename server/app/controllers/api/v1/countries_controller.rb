class Api::V1::CountriesController < ApplicationController
  def index
    @countries = []
    300.times { @countries << FFaker::Address.country }
    render json: @countries.uniq.sort
  end
end
