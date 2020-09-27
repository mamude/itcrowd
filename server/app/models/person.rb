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
class Person < ApplicationRecord
  # pagination
  paginates_per 50
  # association
  has_many :movie_people
  has_many :movies, through: :movie_people, dependent: :destroy

  # validation
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :person_type, presence: true
end
