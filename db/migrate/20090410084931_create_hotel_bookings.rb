class CreateHotelBookings < ActiveRecord::Migration
  def self.up
    create_table :hotel_bookings do |t|
      t.string :hotel_name
      t.string :room_description
      t.string :price
      t.integer :parent_id
    end
  end

  def self.down
    drop_table :hotel_bookings
  end
end
