module CarRental
  class PickupLocation
    # I think we don't use these members anymore. To be confirmed...
    attr_accessor :id
    attr_accessor :name  
    attr_accessor :address
    attr_accessor :telephone
    
    AIRPORT_RADIUS_SEARCH_MILES = 60

    def self.find_by_country(country_code, session)
      if (true) #(DataProvider::DataProvider.is_active("CarTrawler", session[:application_context]))
        return CarRental::CarTrawler::Gateway.find_pickup_locations_by_country(country_code)
      end
    end
    
    def self.find_by_city(city, country_code, session)
      if (true) #(DataProvider::DataProvider.is_active("CarTrawler", session[:application_context]))
        return CarRental::CarTrawler::Gateway.find_pickup_locations_by_city(city, country_code)
      end
    end
    
    def self.find_by_airport(airport, session)
      if (true) #(DataProvider::DataProvider.is_active("CarTrawler", session[:application_context]))
        return CarRental::CarTrawler::Gateway.find_pickup_locations_by_airport(airport)
      end
    end
    
    def self.find_by_coordinates(lat, long, rad, session)
      if (true) #(DataProvider::DataProvider.is_active("CarTrawler", session[:application_context]))
       return CarRental::CarTrawler::Gateway.find_pickup_locations_by_coordinates(lat, long, rad)
      end
    end
    
   def self.get_pickup_locations_at_airports(session)
     RAILS_DEFAULT_LOGGER.error("get_pickup_locations_at_airports")
     current_dest = BreadCrumbManager.get_current_destination(session)
     RAILS_DEFAULT_LOGGER.error("current_dest from get_pickup_locations_at_airports#{current_dest}")
     return CarRental::CarTrawler::Gateway.find_airport_pickup_locations_around(current_dest.lat, current_dest.lng, AIRPORT_RADIUS_SEARCH_MILES)
   end
    
  # pickup_location may be used to improve performance a little...
  def self.get_dropoff_locations_at_airports(session, pickup_locations = nil)
    dropoffs = pickup_locations
    # Get visited destinations
    visited_destinations = BreadCrumbManager.get_visited_destinations(session).dup
    current_destination = Destination::Destination.find(BreadCrumbManager.get_current_destination_id(session))
    
    # if pickup_locations have not been provided, we'll have to query them as well
    visited_destinations.delete(current_destination.id) unless pickup_locations.nil?
    
    visited_destinations.each do |visited_dest_id, visited_dest_name|
      visited_dest = Destination::Destination.find(visited_dest_id)
      nearby_airport = visited_dest.find_nearby_airports(AIRPORT_RADIUS_SEARCH_MILES * 0.62)
      nearby_airport.each do |airport|
        return_loc = find_by_airport(airport.iata_code, session)
        dropoffs |= return_loc unless return_loc.nil?
      end
    end
    return dropoffs
  end

    
  end
end
