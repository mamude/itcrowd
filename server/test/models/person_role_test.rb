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
require 'test_helper'

class PersonRoleTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
