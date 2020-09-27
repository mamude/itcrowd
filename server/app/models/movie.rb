# == Schema Information
#
# Table name: movies
#
#  id           :bigint           not null, primary key
#  release_year :integer          not null
#  title        :string           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
class Movie < ApplicationRecord
  # pagination
  paginates_per 50
  # association
  has_many :movie_people
  has_many :people, through: :movie_people
  has_many :actors, -> { where person_type: :actor }, through: :movie_people, source: :person, dependent: :destroy
  has_many :producers, -> { where person_type: :producer }, through: :movie_people, source: :person, dependent: :destroy
  has_many :directors, -> { where person_type: :director }, through: :movie_people, source: :person, dependent: :destroy

  # validation
  validates :title, presence: true
  validates :release_year, presence: true, length: {is: 4}

  # scopes
  scope :list_order_by_name, -> { order('title ASC') }
  scope :search_by_title_or_year, -> search {
    where('lower(title) ilike ?', "#{search}%")
    .order('title ASC')
  }
end
