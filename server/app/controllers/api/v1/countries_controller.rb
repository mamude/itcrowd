class Api::V1::CountriesController < ApplicationController
  # @route GET /api/v1/countries (api_v1_countries)
  def index
    @countries = []
    300.times { @countries << FFaker::Address.country }
    render json: @countries.uniq.sort
  end
end
