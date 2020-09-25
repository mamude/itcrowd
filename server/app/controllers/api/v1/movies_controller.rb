class Api::V1::MoviesController < ApplicationController
  before_action :set_movie, only: [:show, :update, :destroy]

  # @route GET /api/v1/movies (api_v1_movies)
  def index
    @movies = Movie.all
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
end
