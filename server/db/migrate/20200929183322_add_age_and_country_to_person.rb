class AddAgeAndCountryToPerson < ActiveRecord::Migration[6.0]
  def change
    add_column :people, :age, :int
    add_column :people, :country, :string
  end
end
