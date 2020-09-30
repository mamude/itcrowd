json.movie @movie
json.casting do
  json.array! @movie.people do |person|
    json.person person
    json.roles person.roles
  end
end

