json.movie @movie
json.casting do
  json.array! @movie.people do |person|
    json.person person
    json.roles PersonRole.roles_by_movie(@movie.id, person.id)
  end
end

