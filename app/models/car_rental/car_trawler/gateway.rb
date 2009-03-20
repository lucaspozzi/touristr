require 'hpricot'

module CarRental
 module CarTrawler
  class Gateway
    
    require 'net/https'
    include REXML

    if (ENV["RAILS_ENV"] == "production")
      @@CARTRAWLER_URL = "ota.cartrawler.com"
      @@CARTRAWLER_PORT = "443"
      @@TARGET_MODE = "Production"
    else
      @@CARTRAWLER_URL = "otatest.cartrawler.com"
      @@CARTRAWLER_PORT = "20000"
      @@TARGET_MODE = "Test"
    end
    @@CARTRAWLER_QUERY_URI = "/cartrawlerota"
    @@CARTRAWLER_CLIENT_ID = "137795"
    @@DATA_PROVIDER_ID = "CT"
    
    def self.ping(echo)
      xml_query=<<-END_XML_QUERY
<?xml version="1.0" encoding="UTF-8"?>
        <OTA_PingRQ
            xmlns="http://www.opentravel.org/OTA/2003/05"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:schemaLocation="http://www.opentravel.org/OTA/2003/05 OTA_PingRQ.xsd"
            Target="#{@@TARGET_MODE}"
            Version="1.003">
            <EchoData>#{echo}</EchoData>
        </OTA_PingRQ>
      END_XML_QUERY
      return invoke(xml_query)
    end
    
    def self.find_airports_by_country(country_code)
      xml_query=<<-END_XML_QUERY
<?xml version="1.0" encoding="UTF-8"?> 
<OTA_VehLocSearchRQ 
 xmlns="http://www.opentravel.org/OTA/2003/05" 
 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
 xsi:schemaLocation="http://www.opentravel.org/OTA/2003/05 
OTA_VehLocSearchRQ.xsd" 
 Version="1.005" 
 Target="#{@@TARGET_MODE}"> 
 <POS> 
  <Source> 
   <RequestorID Type="16" ID="#{@@CARTRAWLER_CLIENT_ID}" ID_Context="CARTRAWLER" /> 
  </Source> 
 </POS> 
 <VehLocSearchCriterion ExactMatch="true" ImportanceType="Mandatory"> 
  <Address> 
   <CountryName Code="%s" /> 
  </Address> 
 </VehLocSearchCriterion> 
</OTA_VehLocSearchRQ>
END_XML_QUERY
      xml = invoke(xml_query % [country_code])  
      h = Hpricot(xml)
      check_for_errors(h)
      locations = h.search("//locationdetail").collect do |location|
        {:name=>location[:name], :code=>location[:code], :address=>location.search("//addressline").inner_html}
      end
      return locations
    end
    
    def self.find_pickup_locations_by_country(country_code)
xml_query=<<-END_XML_QUERY
<?xml version="1.0" encoding="UTF-8"?>
<CT_VehLocSearchRQ xmlns="http://www.cartrawler.com/" Version="1.000" Target="#{@@TARGET_MODE}">
  <POS>
    <Source>
      <RequestorID Type="16" ID="#{@@CARTRAWLER_CLIENT_ID}" ID_Context="CARTRAWLER" /> 
    </Source>
  </POS>
  <VehLocSearchCriterion ExactMatch="true" ImportanceType="Mandatory">
    <Address>
      <CountryName Code="#{country_code}" />
    </Address>
  </VehLocSearchCriterion>
</CT_VehLocSearchRQ>
END_XML_QUERY
      xml = invoke(xml_query)
      h = Hpricot(xml)
      check_for_errors(h)
      popular_locations = h.search("//popularvehmatchedlocs")
      locations = popular_locations.search("//locationdetail").collect do |location|
        {:name=>location[:name], :code=>location[:code], :address=>location.search("//addressline").inner_html}
      end
      locations << {:name => "---------------", :code => "--"}
      all_locations = h.search("//vehmatchedlocs")
      locations += all_locations.search("//locationdetail").collect do |location|
        {:name=>location[:name], :code=>location[:code], :address=>location.search("//addressline").inner_html}
      end
      locations.each do |loc|
        puts(loc[:name])
      end 
      return locations
    end
    
    def self.find_pickup_locations_by_city(city, country_code)
      xml_query=<<-END_XML_QUERY
<?xml version="1.0" encoding="UTF-8"?>
<OTA_VehLocSearchRQ
	xmlns="http://www.opentravel.org/OTA/2003/05"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://www.opentravel.org/OTA/2003/05 OTA_VehLocSearchRQ.xsd"
	Version="1.005"
        PrimaryLangID="en"
	Target="#{@@TARGET_MODE}">
	<POS>
		<Source>
			<RequestorID Type="16" ID="#{@@CARTRAWLER_CLIENT_ID}" ID_Context="CARTRAWLER" />
		</Source>
	</POS>
	<VehLocSearchCriterion ExactMatch="true" ImportanceType="Mandatory">
		<Address>
			<CityName>#{city}</CityName>
			<CountryName Code="#{country_code}" />
		</Address>
	</VehLocSearchCriterion>
</OTA_VehLocSearchRQ>
      END_XML_QUERY
      return process_pickup_location(invoke(xml_query))
    end

    def self.find_pickup_locations_by_coordinates(lat, long, radius)
      if radius.nil?
        radius = 10 
      end
      xml_query=<<-END_XML_QUERY
<?xml version="1.0" encoding="UTF-8"?>
<OTA_VehLocSearchRQ
	xmlns="http://www.opentravel.org/OTA/2003/05"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://www.opentravel.org/OTA/2003/05 OTA_VehLocSearchRQ.xsd"
	Version="1.005"
        PrimaryLangID="en"
	Target="#{@@TARGET_MODE}">
	<POS>
		<Source>
			<RequestorID Type="16" ID="#{@@CARTRAWLER_CLIENT_ID}" ID_Context="CARTRAWLER" />
		</Source>
	</POS>
	<VehLocSearchCriterion ExactMatch="true" ImportanceType="Mandatory">
		<Position Latitude="#{lat}" Longitude="#{long}" />
		<Radius Distance="#{radius}" DistanceMeasure="km" />
	</VehLocSearchCriterion>
</OTA_VehLocSearchRQ>
      END_XML_QUERY
      return process_pickup_location(invoke(xml_query))
    end
    
    def self.find_pickup_locations_by_airport(airport_code)
      xml_query=<<-END_XML_QUERY
<?xml version="1.0" encoding="UTF-8"?>
<OTA_VehLocSearchRQ
	xmlns="http://www.opentravel.org/OTA/2003/05"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://www.opentravel.org/OTA/2003/05 OTA_VehLocSearchRQ.xsd"
	Version="1.005"
        PrimaryLangID="en"
	Target="#{@@TARGET_MODE}">
	<POS>
		<Source>
			<RequestorID Type="16" ID="#{@@CARTRAWLER_CLIENT_ID}" ID_Context="CARTRAWLER" />
		</Source>
	</POS>
	<VehLocSearchCriterion ExactMatch="true" ImportanceType="Mandatory">
		<RefPoint>#{airport_code}</RefPoint>
	</VehLocSearchCriterion>
</OTA_VehLocSearchRQ>
      END_XML_QUERY
      return process_pickup_location(invoke(xml_query))
    end
    
    def self.find_airport_pickup_locations_around(lat, long, mi_radius)
      # start by querying all pickup loaction around lat/long, then filter on AtAirport attribute
      xml_query=<<-END_XML_QUERY
<?xml version="1.0" encoding="UTF-8"?>
<OTA_VehLocSearchRQ
	xmlns="http://www.opentravel.org/OTA/2003/05"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://www.opentravel.org/OTA/2003/05 OTA_VehLocSearchRQ.xsd"
	Version="1.005"
        PrimaryLangID="en"
	Target="#{@@TARGET_MODE}">
	<POS>
		<Source>
			<RequestorID Type="16" ID="#{@@CARTRAWLER_CLIENT_ID}" ID_Context="CARTRAWLER" />
		</Source>
	</POS>
	<VehLocSearchCriterion ExactMatch="true" ImportanceType="Mandatory">
		<Position Latitude="#{lat}" Longitude="#{long}" />
		<Radius Distance="#{mi_radius}" DistanceMeasure="mile" />
	</VehLocSearchCriterion>
</OTA_VehLocSearchRQ>
      END_XML_QUERY
      
      xml = invoke(xml_query)
      h = Hpricot(xml)
      check_for_errors(h)
      locations = Array.new
      h.search("//locationdetail[@atairport='1']").each do |location|
        locations << {:code => location[:code], :name => location[:name], :address =>  location[:address]}
      end
      return locations
    end
    
    def self.find_vehicles(pickup_location_id, pickup_datetime, return_location_id, return_datetime, driver_age, driver_country_code, consumer_IP, currency="EUR", vehicle_class=3)
      # ensure we have the seconds in the time params
      pickup_time+=":00" if pickup_time=~/^\d\d:\d\d$/
      return_time+=":00" if return_time=~/^\d\d:\d\d$/
              
      xml_query=<<-END_XML_QUERY
<?xml version="1.0" encoding="UTF-8"?>
<OTA_VehAvailRateRQ
	xmlns="http://www.opentravel.org/OTA/2003/05"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://www.opentravel.org/OTA/2003/05 OTA_VehAvailRateRQ.xsd"
	Target="#{@@TARGET_MODE}"
	Version="1.005">
	<POS>
		<Source ISOCurrency="#{currency}">
			<RequestorID Type="16" ID="#{@@CARTRAWLER_CLIENT_ID}" ID_Context="CARTRAWLER" />
		</Source>
	</POS>
	<VehAvailRQCore Status="Available">
		<VehRentalCore PickUpDateTime="#{pickup_datetime}" ReturnDateTime="#{return_datetime}">
			<PickUpLocation CodeContext="CARTRAWLER" LocationCode="#{pickup_location_id}" />
			<ReturnLocation CodeContext="CARTRAWLER" LocationCode="#{return_location_id}" />
		</VehRentalCore>
	<VehPrefs>
		<VehPref>
			<VehClass Size="#{vehicle_class}"/>
		</VehPref>
	</VehPrefs>
<DriverType Age='#{driver_age}'/>
	</VehAvailRQCore>
<VehAvailRQInfo>
  <Customer>
    <Primary>
      <CitizenCountryName Code='#{driver_country_code}' />
    </Primary>
  </Customer>
  <TPA_Extensions>
    <ConsumerIP>#{consumer_IP}</ConsumerIP>
  </TPA_Extensions>
</VehAvailRQInfo>
</OTA_VehAvailRateRQ>
      END_XML_QUERY
      xml = invoke(xml_query)
      h = Hpricot(xml)
      check_for_errors(h)
      pickup_loc_name = h.at("//vehrentalcore/pickuplocation")[:name]
      return_loc_name = h.at("//vehrentalcore/returnlocation")[:name]
      vendors = h.search("//vehvendoravail")
      vehicule_array = Array.new
      vendors.each do |vendor|
        at_airport = vendor.search("//locationdetails")[0][:atairport]
        vehicles = vendor.search("//vehavail")
        vehicule_array += vehicles.map do |v|
          ref = v.search("//reference")[0]
          {:name=>v.search("//vehmakemodel")[0][:name],
           :code=> v.search("//vehmakemodel")[0][:code],
           :picture_url=> v.search("//vehmakemodel")[0].children[0].inner_html,
           :total_charge => v.search("//totalcharge")[0][:estimatedtotalamount],
           :total_charge_currency => v.search("//totalcharge")[0][:currencycode],
           :prepay_fee_amount => v.search("//fee[@purpose='22']")[0][:amount],
           :prepay_fee_currency => v.search("//fee[@purpose='22']")[0][:currencycode],
           :collection_fee_amount=> v.search("//fee[@purpose='23']")[0][:amount],
           :collection_fee_currency => v.search("//fee[@purpose='23']")[0][:currencycode],
           :air_cond => (v.search("//vehicle")[0][:airconditionind]=="true" ? "yes":"-"),
           :transmission => v.search("//vehicle")[0][:transmissiontype],
           :passengers_quantity => v.search("//vehicle")[0][:passengerquantity],
           :vehicle_asset_number => v.search("//vehicleassetnumber"),
           :vehicle_type => v.search("//vehclass")[0][:size],
           :rate_qualifier => v.search("//ratequalifier")[0][:ratequalifier],
           :pickup_location_name => pickup_loc_name,
           :return_location_name => return_loc_name,
           :reference=>{:at_airport => at_airport, :type=>ref[:type], :id=>ref[:id], :context=>ref[:id_context], :url=>ref[:url], :datetime=>ref[:datetime]}
          }
        end
      end
      return vehicule_array
    end
    
    def self.book_vehicle(reference, currency, pickup_location_code, return_location_code, pickup_date, return_date, driver_country_code, payee, address, payment, driver_age, rate_qualifier)
      #IMPLEMENT ME
      rental_payment=""
      if (!rate_qualifier.include?("POSTPAID"))
        rental_payment=<<-EORENTAL
<RentalPaymentPref> 
  <PaymentCard CardType="1" CardCode="#{payment[:card_type]}" CardNumber="#{payment[:card_no]}" ExpireDate="#{payment[:expiry_month]}#{payment[:expiry_year]}" SeriesCode="#{payment[:series_code]}"> 
    <CardHolderName>#{payment[:name]}</CardHolderName> 
  </PaymentCard> 
</RentalPaymentPref>
EORENTAL
      end
      
      arrival_details = "<ArrivalDetails />"
      if reference[:at_airport]=="1" && !payee[:flight_number].empty? && !payee[:air_company].empty?
        arrival_details=<<-EOARRDET
<ArrivalDetails TransportationCode="14" Number="#{payee[:flight_number]}">
   <OperatingCompany>#{payee[:air_company]}</OperatingCompany>
</ArrivalDetails>
EOARRDET
      elsif reference[:at_airport]=="1"
        arrival_details=<<-EOARRDET
<ArrivalDetails TransportationCode="14"/>
EOARRDET
      end
      
      xml_query=<<-END_XML_QUERY
<?xml version="1.0" encoding="UTF-8"?> 
<OTA_VehResRQ 
 xmlns="http://www.opentravel.org/OTA/2003/05" 
 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
 xsi:schemaLocation="http://www.opentravel.org/OTA/2003/05 OTA_VehResRQ.xsd" 
 Target="#{@@TARGET_MODE}" 
 Version="1.005"> 
 <POS> 
  <Source ISOCurrency="#{currency}"> 
   <RequestorID Type="16" ID="#{@@CARTRAWLER_CLIENT_ID}" ID_Context="CARTRAWLER" /> 
  </Source> 
 </POS> 
 <VehResRQCore Status="All"> 
  <VehRentalCore PickUpDateTime="#{pickup_date}" 
ReturnDateTime="#{return_date}"> 
   <PickUpLocation CodeContext="CARTRAWLER" LocationCode="#{pickup_location_code}" /> 
   <ReturnLocation CodeContext="CARTRAWLER" LocationCode="#{return_location_code}" /> 
  </VehRentalCore> 
  <Customer> 
   <Primary> 
    <PersonName> 
     <NamePrefix>#{payee[:name_prefix]}</NamePrefix> 
     <GivenName>#{payee[:firstname]}</GivenName> 
     <Surname>#{payee[:lastname]}</Surname> 
    </PersonName> 
    <Telephone PhoneTechType="1" AreaCityCode="#{payee[:phone_area_code]}" 
PhoneNumber="#{payee[:phone_number]}"/> 
    <Email EmailType="2">#{payee[:email]}</Email> 
    <Address Type="2"> 
     <StreetNmbr>#{address[:street]}</StreetNmbr> 
     <CityName>#{address[:city]}</CityName> 
     <PostalCode>#{address[:postcode]}</PostalCode> 
     <StateProv>#{address[:state]}</StateProv> 
     <CountryName Code="#{address[:country_code]}" /> 
    </Address> 
   <CitizenCountryName Code="#{driver_country_code}" /> 
   </Primary> 
  </Customer> 
  <DriverType Age="#{driver_age}"/> 
 </VehResRQCore> 
 <VehResRQInfo>
  #{arrival_details}
  #{rental_payment}<Reference Type="#{reference[:type]}" ID="#{reference[:id]}" ID_Context="#{reference[:context]}" 
DateTime="#{reference[:datetime]}" URL="#{reference[:url]}"/>
 </VehResRQInfo> 
</OTA_VehResRQ> 
   END_XML_QUERY
      xml = invoke(xml_query)
      h = Hpricot(xml)
      check_for_errors(h)
      res = {:success => !h.search("//success").empty?,
             :cartrawler_conf_id => h.search("//confid[@type=16]")[0][:id],
             :vendor_conf_id => h.search("//confid[@type=14]")[0][:id],
             :vendor_shortname => h.search("//vendor")[0][:companyshortname],
             :location_details=> { 
               :name=> h.search("//locationdetails")[0][:name],
               :address=> h.search("//addressline").inner_html,
               :phone=> h.search("//telephone")[0][:phonenumber]
              }
      }
      if (!rate_qualifier.include?("POSTPAID"))
        res.merge!({:payment_amount=>h.search("//paymentamount")[0][:amount]})
        res.merge!({:payment_currency=>h.search("//totalcharge")[0][:currencycode]})
      else
        res.merge!({:payment_amount=>"#{h.search("//totalcharge")[0][:currencycode]} #{h.search("//totalcharge")[0][:estimatedtotalamount]} to be paid when picking up the car"})
      end
      res
    end
    
    protected 
    
    # sends query to CarTrawlwer system and returns response
    def self.invoke(xml_query)
      http = Net::HTTP.new(@@CARTRAWLER_URL, @@CARTRAWLER_PORT) 
      http.use_ssl = true

      begin      
        http.start do |http_iter|
          RAILS_DEFAULT_LOGGER.debug("CarRental::Gateway.invoke: xml_query: #{xml_query}")
          resp = http_iter.post(@@CARTRAWLER_QUERY_URI, xml_query, 'Accept' => 'text/xml')
          if (resp.code.to_i != 200)
            RAILS_DEFAULT_LOGGER.error("CarRental::Gateway.invoke: response code: #{resp.code.to_i}")
            raise CarRentalException.new("Sorry, we are experiencing communication problems. Please try again later.")
          end

          RAILS_DEFAULT_LOGGER.debug("CarRental::Gateway.invoke: response: #{resp.body}")
          #return Document.new(resp.body)
          return resp.body
        end
      rescue Exception => e
        RAILS_DEFAULT_LOGGER.error("CarRental::Gateway.invoke: Exception #{e.message}")
        raise CarRentalException.new("Sorry, we are experiencing communication problems. Please try again later.")
      end
    end

    def self.process_pickup_location(xml_loc)
      # check if something went wrong
      if (xml_loc.elements['OTA_ErrorRS'])
        raise CarRentalException.new("Sorry, we are experiencing communication problems. Please try again later.")
      end

      tmp_loc = Array.new
      if (!xml_loc.elements['OTA_VehLocSearchRS/Errors'])
        xml_loc.elements.each('OTA_VehLocSearchRS/VehMatchedLocs/VehMatchedLoc') do |xml_pickup_loc|
          RAILS_DEFAULT_LOGGER.debug("CarRental::Gateway.process_pickup_location: xml_pickup_loc: #{xml_pickup_loc}")
          loc = CarRental::CarTrawler::CarTrawlerPickupLocation.new(xml_pickup_loc)
          tmp_loc << loc
        end
      end
      return tmp_loc
    end

    def self.process_available_vehicles(xml_veh)
      if (xml_veh.elements['OTA_ErrorRS'])
        raise CarRentalException.new("Sorry, we are experiencing communication problems. Please try again later.")
      end

      tmp_veh_list = Array.new
      available_vehicles_result = AvailableVehiclesResponse.new
      if !xml_veh.elements['OTA_VehAvailRateRS/Errors']
        veh_rental_core = xml_veh.elements['OTA_VehAvailRateRS/VehAvailRSCore/VehRentalCore']

        # process each vendor
        xml_veh.elements.each('OTA_VehAvailRateRS/VehAvailRSCore/VehVendorAvails/VehVendorAvail') do |xml_vendor|
          RAILS_DEFAULT_LOGGER.debug("CarRental::Gateway.process_available_vehicles: xml_vendor: #{xml_vendor}")
          #process each vehicle
          xml_vendor.elements.each('VehAvails/VehAvail') do |xml_vehicle|
            RAILS_DEFAULT_LOGGER.debug("CarRental::Gateway.process_available_vehicles: xml_vehicle: #{xml_vehicle}")
            vehicle = CarRental::CarTrawler::CarTrawlerVehicle.new(xml_vehicle)
            
            # set options
            xml_vehicle.elements.each('VehAvailCore/PricedEquips/PricedEquip') do |xml_option|
              RAILS_DEFAULT_LOGGER.debug("CarRental::Gateway.process_available_vehicles: xml_option: #{xml_option}")
              option = CarRental::CarTrawler::CarTrawlerVehicleOption.new(xml_option)
              vehicle.options << option
            end

            # Pickup/return location name and code
            init_vehicle_with_rental_core(vehicle, veh_rental_core)
            
            vehicle.vendor_id = xml_vendor.elements["Vendor"].attributes['Code']
            tmp_veh_list << vehicle
          end
        end
        available_vehicles_result.pickup_location_code = xml_veh.elements['OTA_VehAvailRateRS/VehAvailRSCore/VehRentalCore/PickUpLocation'].attributes['LocationCode']
        available_vehicles_result.pickup_location_name = xml_veh.elements['OTA_VehAvailRateRS/VehAvailRSCore/VehRentalCore/PickUpLocation'].attributes['Name']
        available_vehicles_result.return_location_code = xml_veh.elements['OTA_VehAvailRateRS/VehAvailRSCore/VehRentalCore/ReturnLocation'].attributes['LocationCode']
        available_vehicles_result.return_location_name = xml_veh.elements['OTA_VehAvailRateRS/VehAvailRSCore/VehRentalCore/ReturnLocation'].attributes['Name']
        available_vehicles_result.pickup_datetime = xml_veh.elements['OTA_VehAvailRateRS/VehAvailRSCore/VehRentalCore'].attributes['PickUpDateTime']
        available_vehicles_result.return_datetime = xml_veh.elements['OTA_VehAvailRateRS/VehAvailRSCore/VehRentalCore'].attributes['ReturnDateTime']
        puts("\n\n\nCarRental::CarTrawler::Gateway#process_available_vehicles: Hardcoded Data_provider for CarTrawler\n\n\n")
        available_vehicles_result.data_provider_id = @@DATA_PROVIDER_ID
      else
        raise CarRentalException.new(xml_veh.elements['OTA_VehAvailRateRS/Errors/Error'].text)
      end
      available_vehicles_result.available_vehicles = tmp_veh_list
      return available_vehicles_result
    end
    
    def self.init_vehicle_with_rental_core(vehicle, xml_rental_core)
      vehicle.pickup_location_code = xml_rental_core.elements['PickUpLocation'].attributes['LocationCode']
      vehicle.pickup_location_name = xml_rental_core.elements['PickUpLocation'].attributes['Name']
      vehicle.return_location_code = xml_rental_core.elements['ReturnLocation'].attributes['LocationCode']
      vehicle.return_location_name = xml_rental_core.elements['ReturnLocation'].attributes['Name']
    end
    
    def self.check_for_errors(hpricot)
      if (!hpricot.at("//errors").nil? || !hpricot.at("//ota_errorrs").nil?)
        RAILS_DEFAULT_LOGGER.error("CarRental::CarTrawler::Gateway#check_for_errors: #{hpricot.to_s}")
        text = nil
        if (!hpricot.at("//errors").nil?)
          text = hpricot.search("//error").inner_html
        else
          text = "Something went wrong..."
        end
        raise CarRentalException.new(text)
      end

    end
  end
 end
end
