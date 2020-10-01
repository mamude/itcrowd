class Api::V1::PeopleController < ApplicationController
  before_action :is_authenticaded, only: [:create, :update, :destroy]
  before_action :set_person, only: [:show, :update, :destroy]

  # @route GET /api/v1/people (api_v1_people)
  def index
    @people = Person.list_order_by_name.page(params[:page])
    @total_pages = @people.total_pages
    @total_count = @people.total_count
    @current_page = @people.current_page
  end

  # @route POST /api/v1/people/search (api_v1_people_search)
  def search
    @people = Person.search(search_params[:search]).page(params[:page])
    @total_pages = @people.total_pages
    @total_count = @people.total_count
    @current_page = @people.current_page
  end

  def autocomplete
    @people = Person.search(search_params[:search]).page(params[:page]).limit(100)
  end

  # @route GET /api/v1/people/:id (api_v1)
  def show
    @people
  end

  def create
    person = Person.create(person_params)
    if person.save
      render json: { message: "Person created successfully" }, status: :created
    else
      render json: { error: person.errors.messages }, status: :bad_request
    end
  end

  # @route PUT /api/v1/people/:id (api_v1)
  def update
    @person.update(person_params)
    head :no_content
  end

  # @route DELETE /api/v1/people/:id (api_v1)
  def destroy
    @person.destroy
    head :no_content
  end

  private

  def set_person
    @person = Person.find_by_id(params[:id])
    unless @person.present?
      render json: {error: "Person not found"}, status: 404
    end
  end

  def person_params
    params.require(:person).permit(:age, :last_name, :first_name, :aliases, :country)
  end

  def search_params
    params.require(:person).permit(:search)
  end
end
