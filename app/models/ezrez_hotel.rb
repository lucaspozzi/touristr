class EzrezHotel < EzrezBase
  
  def room_search params = {}
      check_params [:CheckinDate, :CheckoutDate, :Where]
      params.reverse_merge!( {
        :MinimumResults   => 1,
        :BookingComponent => 'Room',
        :NumAdults        => 1,
        :NumChildren      => 0,
        :NumRooms         => 1
      })
      # retrieve embede condition
      where = params[:Where]
      # '-' in destination name seems to confuse EzRez...
      where.values.first.gsub!("-", " ")

      params.delete(:Where)
      params.merge!(where)
      res = execute(:RoomSearch=>params)
      hash_res = Hash.from_xml(res)
      hotels = Array.new
      if hash_res["AvailabilityRS"] && hash_res["AvailabilityRS"].has_key?("Success")
        hash_res["AvailabilityRS"]["RoomSearchResponse"]["Hotel"].each do |h|
          hotels << h
          end
        else
          if hash_res["EzRezGenericRS"] and hash_res["EzRezGenericRS"]["Failure"]
            raise Exception.new(hash_res["EzRezGenericRS"]["Failure"])
          else
            raise Exception.new("Something else...")
          end
        end
      hotels
  end
  
  def room_search_by_airport params = {}
    check_params [:AirportCode, :CheckinDate, :CheckoutDate]
    params.reverse_merge!( {
      :MinimumResults   => 1,
      :BookingComponent => 'Room',
      :NumAdults        => 1,
      :NumChildren      => 0,
      :NumRooms         => 1
    })
    res = execute(:RoomSearch=>params)
    hash_res = Hash.from_xml(res)
    if hash_res["AvailabilityRS"].has_key?("Success")
      hash_res["AvailabilityRS"]["RoomSearchResponse"]["Hotel"]
    else
      return Array.new
    end
  end

  def room_search_by_city params = {}
    check_params [:Location, :CheckinDate, :CheckoutDate]
    params.reverse_merge!( {
      :MinimumResults   => 1,
      :BookingComponent => 'Room',
      :NumAdults        => 1,
      :NumChildren      => 0,
      :NumRooms         => 1
    })
    res = execute(:RoomSearch=>params)
    hash_res = Hash.from_xml(res)
    if hash_res["AvailabilityRS"].has_key?("Success")
      hash_res["AvailabilityRS"]["RoomSearchResponse"]["Hotel"]
    else
      return Array.new
    end
  end

  
  def test_query_airport
    # room_search_by_airport(:Where => {:AirportCode => "MCO"}, :CheckinDate => "2009-05-10", :CheckoutDate=> "2009-05-15").each do |hotel|
    room_search(:Where => {:AirportCode => "MCO"}, :CheckinDate => "2009-05-10", :CheckoutDate=> "2009-05-15").each do |hotel|
      puts(hotel.inspect)
      puts("\n\n")
    end
    nil
  end
  
  def test_query_city
    # room_search_by_city(:Where => {:Location => "Paris, France"}, :CheckinDate => "2009-05-10", :CheckoutDate=> "2009-05-15").each do |hotel|
    room_search(:Where => {:Location => "Paris, France"}, :CheckinDate => "2009-05-10", :CheckoutDate=> "2009-05-15").each do |hotel|
      puts(hotel.inspect)
      puts("\n\n")
    end
    nil
  end
    
end
