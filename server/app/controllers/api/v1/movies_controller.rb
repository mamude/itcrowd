class Api::V1::MoviesController < ApplicationController
  before_action :is_authenticaded, only: [:create, :update, :destroy]
  before_action :set_movie, only: [:show, :update, :destroy]

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

  private

  def set_movie
    @movie = Movie.find_by_id(params[:id])
    unless @movie.present?
      render json: {error: "Movie not found"}, status: 404
    end
  end

  def movie_params
    params.require(:movie).permit(:title, :release_year)
  end

  def search_params
    params.require(:movie).permit(:name)
  end
end
