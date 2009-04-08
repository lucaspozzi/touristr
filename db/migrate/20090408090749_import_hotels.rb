class ImportHotels < ActiveRecord::Migration
  def self.up
#    rename_table :hotels, :hotels_old
    create_table :hotels, :force => true do |t|
      t.column :ezrez_id, :integer
      t.column :name, :string
      t.column :cat_code, :string
      t.column :dest_code, :string
      t.column :zone_code, :string
      t.column :chain, :string
      t.column :licence, :string
      t.column :latitude, :string
      t.column :longitude, :string
    end
    load_data_from_file 
  end

  def self.down
#    drop_table :hotels
#    rename_table :hotels_old, :hotels  
  end
  
  private
  
  def self.load_data_from_file
    # EzRez format is:
    # HotelCode | Name | CategoryCode | DestinationCode | ZoneCode | ChainCode | Licence | Latitude | Longitude 
    sqlString = "LOAD DATA LOCAL INFILE '#{RAILS_ROOT}/db/data/Hotels.csv' INTO TABLE hotels"
    sqlString += " FIELDS TERMINATED BY '|'"
    sqlString += " (ezrez_id, name, cat_code, dest_code, zone_code, chain, licence, latitude, longitude)"
    execute sqlString      
  end
end
