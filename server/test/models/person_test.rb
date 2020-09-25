# == Schema Information
#
# Table name: people
#
#  id          :bigint           not null, primary key
#  aliases     :string
#  first_name  :string           not null
#  last_name   :string           not null
#  person_type :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
require 'test_helper'

class PersonTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
