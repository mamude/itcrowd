json.person @person
json.movies do
  json.array! @person.movies do |movie|
    json.movie movie
    json.roles @person.roles
  end
end
