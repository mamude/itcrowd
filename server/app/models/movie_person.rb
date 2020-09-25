# == Schema Information
#
# Table name: movie_people
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  movie_id   :bigint           not null
#  person_id  :bigint           not null
#
# Indexes
#
#  index_movie_people_on_movie_id   (movie_id)
#  index_movie_people_on_person_id  (person_id)
#
# Foreign Keys
#
#  fk_rails_...  (movie_id => movies.id)
#  fk_rails_...  (person_id => people.id)
#
class MoviePerson < ApplicationRecord
  belongs_to :movie
  belongs_to :person
end
