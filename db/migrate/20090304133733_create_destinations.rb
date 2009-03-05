class CreateDestinations < ActiveRecord::Migration

  def self.up    
    
    create_table :destinations do |table|
      table.column :name, :string
      table.column :ascii_name, :string
      table.column :alternate_names, :string
      table.column :lng, :decimal, :precision => 15, :scale => 10
      table.column :lat, :decimal, :precision => 15, :scale => 10
      table.column :feature_class, :string, :limit => 1
      table.column :feature_code, :string, :limit => 10
      table.column :region_name, :string, :limit => 40
      table.column :country_code, :string, :limit => 2
      table.column :cc2, :string, :limit => 60
      table.column :admin1_code, :string, :limit => 20
      table.column :admin2_code, :string, :limit => 80
      table.column :admin3_code, :string, :limit => 20
      table.column :admin4_code, :string, :limit => 20
      table.column :population, :integer
      table.column :elevation, :integer
      table.column :gtopo30, :integer
      table.column :timezone, :string
      table.column :modification_date, :date
      table.timestamps
    end
    
    add_index :destinations, :country_code
    add_index :destinations, :admin1_code
    add_index :destinations, :feature_class
    add_index :destinations, :name
    add_index :destinations, :alternate_names    

  end

  def self.down
    drop_table :destinations
  end
end
