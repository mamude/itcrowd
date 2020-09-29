class RemovePersonTypeFromPerson < ActiveRecord::Migration[6.0]
  def change
    remove_column :people, :person_type
  end
end
