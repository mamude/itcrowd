# == Schema Information
#
# Table name: people
#
#  id         :bigint           not null, primary key
#  age        :integer
#  aliases    :string
#  country    :string
#  first_name :string           not null
#  last_name  :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Person < ApplicationRecord
  # pagination
  paginates_per 50
  # association
  has_many :movie_people
  has_many :movies, through: :movie_people, dependent: :destroy
  has_many :person_role
  has_many :roles, through: :person_role, dependent: :destroy

  # validation
  validates :age, presence: true, length: {maximum: 2}
  validates :country, presence: true
  validates :first_name, presence: true
  validates :last_name, presence: true

  # scopes
  scope :list_order_by_name, -> { order('first_name ASC') }
  scope :search_by_name, -> search {
    where('lower(first_name) ilike ? or lower(last_name) ilike ?', "%#{search}%", "%#{search}%")
    .order('first_name ASC')
  }
end
