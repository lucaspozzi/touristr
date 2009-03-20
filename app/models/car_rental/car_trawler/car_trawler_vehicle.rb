module CarRental
  module CarTrawler
    class CarTrawlerVehicle < CarRental::Vehicle

      def initialize(xml_vehicle)
        super()
        self.id = xml_vehicle.elements['VehAvailCore/Vehicle/VehIdentity'].attributes['VehicleAssetNumber']
        self.make_model = xml_vehicle.elements['VehAvailCore/Vehicle/VehMakeModel'].attributes['Name']
        self.booking_ref = xml_vehicle.elements['VehAvailCore/Reference']
        self.baggages_quantity = xml_vehicle.elements['VehAvailCore/Vehicle'].attributes['BaggageQuantity']
        self.vehicle_category = xml_vehicle.elements['VehAvailCore/Vehicle/VehType'].attributes['VehicleCategory']
        self.vehicle_size = xml_vehicle.elements['VehAvailCore/Vehicle/VehClass'].attributes['Size']
        self.air_cond = xml_vehicle.elements['VehAvailCore/Vehicle'].attributes['AirConditionInd']
        self.transmission = xml_vehicle.elements['VehAvailCore/Vehicle'].attributes['TransmissionType']
        self.fuel = xml_vehicle.elements['VehAvailCore/Vehicle'].attributes['FuelType']
        self.passengers_quantity = xml_vehicle.elements['VehAvailCore/Vehicle'].attributes['PassengerQuantity']
        self.doors_count = xml_vehicle.elements['VehAvailCore/Vehicle/VehType'].attributes['DoorCount']
        self.picture_url = xml_vehicle.elements['VehAvailCore/Vehicle/PictureURL'].text
        self.total_charge = xml_vehicle.elements['VehAvailCore/TotalCharge'].attributes['RateTotalAmount']
        self.currency = xml_vehicle.elements['VehAvailCore/TotalCharge'].attributes['CurrencyCode']
#        self.options = Array.new
      end

    end
  end
end
