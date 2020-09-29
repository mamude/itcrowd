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
  # concerns
  include MovieConcern
  # pagination
  paginates_per 50
  # association
  has_many :movie_people
  has_many :people, through: :movie_people

  # validation
  validates :title, presence: true
  validates :release_year, presence: true, length: {is: 4}

  # scopes
  scope :list_order_by_name, -> { order('title ASC') }
  scope :search_by_title_, -> search {
    where('lower(title) ilike ?', "%#{search}%")
    .order('title ASC')
  }

  def as_json(options = {})
    super.tap do |json|
      json[:roman_numerals] = roman(self.release_year)
    end
  end
end
