class CreateMoviePeople < ActiveRecord::Migration[6.0]
  def change
    create_table :movie_people do |t|
      t.belongs_to :movie, null: false, foreign_key: true
      t.belongs_to :person, null: false, foreign_key: true
      t.timestamps
    end
  end
end
