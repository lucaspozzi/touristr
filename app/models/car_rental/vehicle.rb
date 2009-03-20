module CarRental
  class Vehicle
    attr_accessor :id
    attr_accessor :vendor_id
    attr_accessor :pickup_location_code
    attr_accessor :pickup_location_name
    attr_accessor :pickup_date
    attr_accessor :return_location_code
    attr_accessor :return_location_name
    attr_accessor :return_date
    attr_accessor :air_cond
    attr_accessor :transmission
    attr_accessor :fuel
    attr_accessor :passengers_quantity
    attr_accessor :baggages_quantity
    attr_accessor :vehicle_category
    attr_accessor :vehicle_size
    attr_accessor :doors_count
    attr_accessor :make_model
    attr_accessor :picture_url
    attr_accessor :total_charge
    attr_accessor :currency
    attr_accessor :booking_ref
    attr_accessor :options
    
    def initialize
      self.options = Array.new
    end
    
    def self.find_vehicles(veh_class, pickup_id, pickup_date, pickup_time, 
        return_location_id, return_date, return_time, driver_age, driver_country_code, remote_ip, session)
      if (true) #(DataProvider::DataProvider.is_active("CarTrawler", session[:application_context]))
        return CarRental::CarTrawler::Gateway.find_vehicles(veh_class, pickup_id, pickup_date, pickup_time, 
        return_location_id, return_date, return_time, driver_age, driver_country_code, remote_ip)
      end
    end
  end
end