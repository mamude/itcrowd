class Api::V1::PeopleController < ApplicationController
  before_action :is_authenticaded, only: [:update, :destroy, :add_actor, :add_director, :add_producer]
  before_action :set_movie, only: [:all_by_movie, :add_actor, :add_producer, :add_director]
  before_action :set_person, only: [:show, :update, :destroy]

  # @route GET /api/v1/people (api_v1_people)
  def index
    @people = Person.all
  end

  # @route GET /api/v1/movies/:movie_id/people/all (all_api_v1_movie_people)
  def all_by_movie
    @people = @movie.people
  end

  # @route GET /api/v1/people/:id (api_v1)
  def show
    @people
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

  # @route POST /api/v1/movies/:movie_id/people/actor (actor_api_v1_movie_people)
  def add_actor
    person = @movie.actors.build(person_params)
    @movie.people << person
    if person.save
      render json: { message: "Person created successfully" }
    else
      render json: { error: person.errors.messages }
    end
  end

  # @route POST /api/v1/movies/:movie_id/people/producer (producer_api_v1_movie_people)
  def add_producer
    person = @movie.producers.build(person_params)
    @movie.people << person
    if person.save
      render json: { message: "Person created successfully" }
    else
      render json: { error: person.errors.messages }
    end
  end

  # @route POST /api/v1/movies/:movie_id/people/director (director_api_v1_movie_people)
  def add_director
    person = @movie.directors.build(person_params)
    @movie.people << person
    if person.save
      render json: { message: "Person created successfully" }
    else
      render json: { error: person.errors.messages }
    end
  end

  private

  def set_person
    @person = Person.find_by_id(params[:id])
    unless @person.present?
      render json: {error: "Person not found"}, status: 404
    end
  end

  def set_movie
    @movie = Movie.find_by_id(params[:movie_id])
    unless @movie.present?
      render json: {error: "Movie not found"}, status: 404
    end
  end

  def person_params
    params.require(:person).permit(:last_name, :first_name, :aliases, :person_type)
  end
end
