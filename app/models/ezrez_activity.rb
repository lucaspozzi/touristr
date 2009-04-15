class EzrezActivity < EzrezBase
    
  def activity_search params = {}
    check_params [:AirportCode, :StartDate, :EndDate]
    params.reverse_merge!( {
      :MinimumResults   => 1,
    })
    res = execute(:ActivitySearch=>params)
    hash_res = Hash.from_xml(res)
    if hash_res["AvailabilityRS"].has_key?("Success")
      hash_res["AvailabilityRS"]["ActivitySearchResponse"]["ActivityChoice"]
    else
      return Array.new
    end
  end
  
  def test_query
    activity_search(:AirportCode => "MCO", :StartDate => "2009-05-10", :EndDate=> "2009-05-11")
  end
  
end
