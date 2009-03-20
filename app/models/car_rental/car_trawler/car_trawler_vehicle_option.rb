module CarRental
  module CarTrawler
    class CarTrawlerVehicleOption < CarRental::VehicleOption

      def initialize(xml_option)
        self.description = xml_option.elements['Equipment/Description'].text
        self.price = xml_option.elements['Charge'].attributes['Amount']
        self.currency = xml_option.elements['Charge'].attributes['CurrencyCode']
        self.tax_inclusive = xml_option.elements['Charge'].attributes['TaxInclusive']
        self.included_in_rate = xml_option.elements['Charge'].attributes['IncludedInRate']
      end

    end
  end
end
