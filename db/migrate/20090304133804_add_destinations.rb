class AddDestinations < ActiveRecord::Migration

  def self.up
    # load_data_from_file "FR.txt"
    # load_data_from_file "IE.txt"
    # load_data_from_file "VN.txt"
    load_data_from_file "allCountries.txt"
  end

  def self.down
    Destination::Destination.delete_all
  end
  
  private
  
  def self.load_data_from_file file
    sqlString = "LOAD DATA LOCAL INFILE '#{RAILS_ROOT}/db/data/#{file}' INTO TABLE destinations"
    sqlString += " FIELDS TERMINATED BY '\t'"
    sqlString += " (id, name, ascii_name, alternate_names, lat, lng, feature_class, feature_code, country_code, cc2, admin1_code, admin2_code, admin3_code, admin4_code, population, elevation, gtopo30, timezone, modification_date)"
    execute sqlString      
  end

end
