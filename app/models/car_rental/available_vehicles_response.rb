module CarRental
  class AvailableVehiclesResponse
    attr_accessor :data_provider_id
    attr_accessor :pickup_location_code
    attr_accessor :pickup_location_name
    attr_accessor :return_location_code
    attr_accessor :return_location_name
    attr_accessor :pickup_datetime
    attr_accessor :return_datetime
    attr_accessor :available_vehicles
    
    def initialize
      self.available_vehicles = Array.new
    end
    
  end
end