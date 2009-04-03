class EzrezFlight < EzrezBase
    
  def flight_search params = {}
    check_params [:Cabin, :FromAirport, :ToAirport, :DepartureDateTime, :ReturnDateTime]
    params.reverse_merge!( {
      :MinimumResults   => 1,
      :Adults => 2,
      :Leg => [{:FromCity => params[:FromAirport], :ToCity => params[:ToAirport], :DepartureTimestamp => params[:DepartureDateTime]},
               {:FromCity => params[:ToAirport], :ToCity => params[:FromAirport], :DepartureTimestamp => params[:ReturnDateTime]}
              ]
    } )
    
    params.delete(:FromAirport)
    params.delete(:ToAirport)
    params.delete(:DepartureDateTime)
    params.delete(:ReturnDateTime)
    
    res = execute(:AirSearch=>params)
    puts(res.inspect)
    
    hash_air_results = Hash.from_xml(res)
    
    if hash_air_results["AvailabilityRS"].has_key?("Success")
    # if only one AirSegment or AirLeg, Hash.from_xml won't return an array.
    # embeding this hash in a single element array makes thing easier...
      hash_air_results = normalize_air_search_results(hash_air_results["AvailabilityRS"]["AirSearchResponse"])
      return hash_air_results
    else
      return Array.new
    end
  end
  
  def test_query
    alternatives = flight_search(:Cabin => "coach", :FromAirport => "MRS", :ToAirport => "CDG", :DepartureDateTime => "2009-05-10T13:00", :ReturnDateTime=> "2009-05-15T19:00")
    
    alternatives.each do |alternative|
      alternative["LegChoices"].each do |leg_choice|
        leg_choice["AirLeg"].each do |air_leg|
          air_leg["AirSegment"].each do |air_seg|
            puts("From #{air_seg["FromCity"]} to #{air_seg["ToCity"]} on flight #{air_seg["Airline"]}#{air_seg["Flight"]}")
          end
        end
        
      end
    end
    nil
  end
  
  protected
  
  # Due to Hash.from_xml, we might get either [{},{}] or {}
  # We turn {} into [{}] to deal only with arrays
  def normalize_air_search_results(hash)
    hash["Alternative"] = [alternatives["Alternative"]] if hash["Alternative"].instance_of?(Hash)
    hash["Alternative"].each do |alternative|
      alternative["LegChoices"] = [alternative["LegChoices"]] if alternative["LegChoices"].instance_of?(Hash)
      alternative["LegChoices"].each do |leg_choice|
        leg_choice["AirLeg"] = [leg_choice["AirLeg"]] if leg_choice["AirLeg"].instance_of?(Hash)
        leg_choice["AirLeg"].each do |air_leg|
          air_leg["AirSegment"] = [air_leg["AirSegment"]] if air_leg["AirSegment"].instance_of?(Hash)
          air_leg["AirSegment"].each do |air_seg|
            puts("From #{air_seg["FromCity"]} to #{air_seg["ToCity"]} on flight #{air_seg["Airline"]}#{air_seg["Flight"]}")
          end
        end
      end
    end
  end
end
