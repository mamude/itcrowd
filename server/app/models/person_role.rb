# == Schema Information
#
# Table name: person_roles
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  movie_id   :bigint           not null
#  person_id  :bigint           not null
#  role_id    :bigint           not null
#
# Indexes
#
#  index_person_roles_on_movie_id   (movie_id)
#  index_person_roles_on_person_id  (person_id)
#  index_person_roles_on_role_id    (role_id)
#
# Foreign Keys
#
#  fk_rails_...  (movie_id => movies.id)
#  fk_rails_...  (person_id => people.id)
#  fk_rails_...  (role_id => roles.id)
#
class PersonRole < ApplicationRecord
  # associations
  belongs_to :person
  belongs_to :role
  belongs_to :movie

  # scopes
  scope :roles_by_movie, -> (movie, person) {
    includes(:person, :role, :movie)
    .joins(:person, :role, :movie)
    .select('roles.name')
    .where('movies.id = ? AND people.id = ?', movie, person)
    .order('roles.name ASC')
  }
end
