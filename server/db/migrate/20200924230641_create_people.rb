class CreatePeople < ActiveRecord::Migration[6.0]
  def change
    create_table :people do |t|
      t.string :last_name, null: false
      t.string :first_name, null: false
      t.string :aliases
      t.string :person_type, null: false
      t.timestamps
    end
  end
end
