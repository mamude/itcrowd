json.person @person
json.movies do
  json.array! @person.movies do |movie|
    json.movie movie
    json.roles PersonRole.roles_by_movie(movie.id)
  end
end
