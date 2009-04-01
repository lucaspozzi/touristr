class EzrezFlight < EzrezBase
    
  def flight_search params = {}
    check_params [:Cabin, :FromAirport, :ToAirport, :DepartureDateTime, :ArrivalDateTime]
    params.reverse_merge!( {
      :MinimumResults   => 1,
      :Adults => 2,
      :Leg => [{:FromCity => params[:FromAirport], :ToCity => params[:ToAirport], :DepartureTimestamp => params[:DepartureDateTime]},
               {:FromCity => params[:ToAirport], :ToCity => params[:FromAirport], :DepartureTimestamp => params[:ArrivalDateTime]}
              ]
    } )
    
    params.delete(:FromAirport)
    params.delete(:ToAirport)
    params.delete(:DepartureDateTime)
    params.delete(:ArrivalDateTime)
    
    res = execute(:AirSearch=>params)
    puts(res.inspect)
    hash_res = Hash.from_xml(res)
    if hash_res["AvailabilityRS"].has_key?("Success")
      hash_res["AvailabilityRS"]["AirSearchResponse"]["Alternative"]
    else
      return Array.new
    end
  end
  
  def test_query
    flight_search(:Cabin => "coach", :FromAirport => "CDG", :ToAirport => "MCO", :DepartureDateTime => "2009-05-10T13:00", :ArrivalDateTime=> "2009-05-15T19:00").each do |flight|
      puts(flight.inspect)
      puts("\n\n")
    end
    nil
  end
  
end
