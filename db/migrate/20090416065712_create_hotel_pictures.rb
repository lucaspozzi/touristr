class CreateHotelPictures < ActiveRecord::Migration
  def self.up
    create_table :hotel_pictures do |t|
      t.string :hotel_code
      t.string :image_code
      t.string :order_num
      t.string :visualisation_order
      t.string :image_path
    end
    load_data_from_file 
  end

  def self.down
    drop_table :hotel_pictures
  end
  
  def self.load_data_from_file
    sqlString = "LOAD DATA LOCAL INFILE '#{RAILS_ROOT}/db/data/HotelImages.csv' INTO TABLE hotel_pictures"
    sqlString += " FIELDS TERMINATED BY '|'"
    sqlString += " (hotel_code, image_code, order_num, visualisation_order, image_path)"
    execute sqlString      
  end
  
end
