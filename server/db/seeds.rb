# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Truncate tables
DatabaseCleaner.clean_with(:truncation)

# Add User Admin
User.create(username: 'admin', password: 'admin')

# Add Roles
['Actor','Producer','Director'].each do |role|
  Role.create(name: role)
end

# Add Movies
100.times do
  date = Faker::Date.between(from: 50.years.ago, to: Date.today)
  Movie.create(title: FFaker::Movie.title, release_year: date.year)
end

# Add People
200.times do
  age = rand(1..65)
  person = Person.create(age: age, country: FFaker::Address.country, last_name: FFaker::Name.last_name, first_name: FFaker::Name.first_name, aliases: Faker::FunnyName.name)
end

# Associate Person X N Movies
200.times do
  role = Role.find(rand(1..3))
  movie = Movie.find(rand(1..100))
  person = Person.find(rand(1..200))
  movie.people << person
  movie.person_role.create(person: person, role: role)
end
