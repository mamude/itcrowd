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
1000.times do
  date = Faker::Date.between(from: 50.years.ago, to: Date.today)
  Movie.create(title: FFaker::Movie.title, release_year: date.year)
end

# Add People
2000.times do
  age = rand(1..65)
  person = Person.create(age: age, country: FFaker::Address.country, last_name: FFaker::Name.last_name, first_name: FFaker::Name.first_name, aliases: Faker::FunnyName.name)
end

# Associate Person X N Movies
2000.times do
  movie = Movie.find(rand(1..1000))
  person = Person.find(rand(1..2000))
  movie.people << person
end

# Associate Person X N Roles
2000.times do
  role = Role.find(rand(1..3))
  person = Person.find(rand(1..2000))
  unless PersonRole.where(person:person, role:role).exists?
    person.roles << role
  end
end
