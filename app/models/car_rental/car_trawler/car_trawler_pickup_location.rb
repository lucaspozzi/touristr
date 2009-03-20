module CarRental
  module CarTrawler
    class CarTrawlerPickupLocation < CarRental::PickupLocation

      def initialize(location)
        self.id = location.elements['LocationDetail'].attributes['Code']
        self.name = location.elements['LocationDetail'].attributes['Name']
        self.address = location.elements['LocationDetail/Address/AddressLine'].text
        self.telephone = !location.elements['LocationDetail/Telephone'].nil? ? 
          location.elements['LocationDetail/Telephone'].attributes['PhoneNumber'] : "unknown"
      end

    end
  end
end
