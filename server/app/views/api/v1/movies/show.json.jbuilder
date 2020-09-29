json.movie @movie
json.casting do
  json.array! @movie.people do |people|
    json.people people
    json.roles people.roles
  end
end

