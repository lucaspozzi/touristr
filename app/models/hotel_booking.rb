class HotelBooking < ActiveRecord::Base
    include Trippy
    has_one :trip_items, :as=>:trippy, :dependent=>:destroy
    
    def parent
      Destination[self.parent_id]
    end
    
    def name
      "Hotel #{self.hotel_name}"
    end
end