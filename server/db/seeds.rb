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

# Add Movies
100.times do
  date = Faker::Date.between(from: 50.years.ago, to: Date.today)
  Movie.create(title: FFaker::Movie.title, release_year: date.year) do |movie|
    # add actors
    count = rand(1..30)
    count.times do
      movie.actors.build(last_name: FFaker::Name.last_name, first_name: FFaker::Name.first_name, aliases: Faker::FunnyName.name)
    end

    # add producers
    count = rand(1..50)
    count.times do
      movie.producers.build(last_name: FFaker::Name.last_name, first_name: FFaker::Name.first_name, aliases: Faker::FunnyName.name)
    end

    # add directors
    count = rand(1..3)
    count.times do
      movie.directors.build(last_name: FFaker::Name.last_name, first_name: FFaker::Name.first_name, aliases: Faker::FunnyName.name)
    end
  end
end
