class Api::V1::MoviesController < ApplicationController
  before_action :is_authenticaded, only: [:create, :update, :destroy, :add_person]
  before_action :set_movie, only: [:show, :update, :destroy, :add_person]
  before_action :set_person, only: [:add_person]
  before_action :set_roles, only: [:add_person]

  # @route GET /api/v1/movies (api_v1_movies)
  def index
    @movies = Movie.list_order_by_name.page(params[:page])
    @total_pages = @movies.total_pages
    @total_count = @movies.total_count
    @current_page = @movies.current_page
  end

  # @route POST /api/v1/movies/search (search_api_v1_movies)
  def search
    @movies = Movie.search_by_title(search_params[:name]).page(params[:page])
    @total_pages = @movies.total_pages
    @total_count = @movies.total_count
    @current_page = @movies.current_page
  end

  # @route GET /api/v1/movies/:id (api_v1_movie)
  def show
    @movie
  end

  # @route POST /api/v1/movies (api_v1_movies)
  def create
    movie = Movie.new(movie_params)
    if movie.save
      render json: {message: "Movie created successfully" }, status: :created
    else
      render json: {error: movie.errors.messages}, status: :bad_request
    end
  end

  # @route PATCH /api/v1/movies/:id (api_v1_movie)
  # @route PUT /api/v1/movies/:id (api_v1_movie)
  def update
    @movie.update(movie_params)
    head :no_content
  end

  # @route DELETE /api/v1/movies/:id (api_v1_movie)
  def destroy
    @movie.destroy
    head :no_content
  end

  # @route POST /api/v1/movies/:id/add_person
  def add_person
    # checks if person is already belongs to this movie
    movie = @person.movie_people.where(movie_id: @movie.id).exists?
    unless movie
      @movie.people << @person
      @roles.each do |role|
        @person.person_roles.create(movie: @movie, person: @person, role: role)
      end
      render json: {message: "Person added to the movie successfully" }, status: :created
    else
      render json: {message: "This person already belongs to this movie" }, status: :created
    end
  end

  private

  def set_movie
    @movie = Movie.find_by_id(params[:id])
    unless @movie.present?
      render json: {error: "Movie not found"}, status: 404
    end
  end

  def set_person
    @person = Person.find_by_id(params[:movie][:person])
    unless @person.present?
      render json: {error: "Person not found"}, status: 404
    end
  end

  def set_roles
    @roles = Role.where(id: params[:movie][:role])
    unless @roles.present?
      render json: {error: "Role(s) not found"}, status: 404
    end
  end

  def movie_params
    params.require(:movie).permit(:title, :release_year, :person, role: [])
  end

  def search_params
    params.require(:movie).permit(:name)
  end
end
