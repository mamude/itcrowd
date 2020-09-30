class AddMovieToPersonRoles < ActiveRecord::Migration[6.0]
  def change
    add_reference :person_roles, :movie, null: false, foreign_key: true
  end
end
