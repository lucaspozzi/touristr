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
      params.delete(:Where)
      params.merge!(where)
      res = execute(:RoomSearch=>params)
      hash_res = Hash.from_xml(res)
      hotels = Array.new
      if hash_res["AvailabilityRS"] && hash_res["AvailabilityRS"].has_key?("Success")
        hash_res["AvailabilityRS"]["RoomSearchResponse"]["Hotel"].each do |h|
#          puts("processing: #{h.inspect}\n#{h["EzRezId"]}\n\n")
          hotels << { :ezrez_id => h["EzRezId"],
                    :booking_descriptor => h["BookingDescriptor"],
          #          :chain_name => [],
                    :hotel_name => h["HotelName"],
          #          :hotel_code  => h[],
          #          :policies => h[],
          #          :property_description => h[],
          #          :room_description => h[],
          #          :address  => h[],
          #          :phone  => h[],
          #          :local_phone => h[],
          #          :fax  => h[],
          #          :local_fax => h[],
          #          :amenities  => h[],
          #          :familly_description => h[],
          #          :checkin => h[],
          #          :checkout => h[],
          #          :rating => h[],
          #          :special_notice => h[],
          #          :additional_info => h[],
          #          :currency => h[],
          #          :minimum_price => h[],
          #          :html => h[],
          #          :url => h[],
          #          :map_url => h[],
                    :thumbnail => h["Thumbnail"],
                    :room_segment => h["RoomSegment"],
          #          :room_amenities => h[],
          #          :room_amenities_description => h[],
          #          :direction => h[],
          #          :restaurant_description => h[],
          #          :images => h[],
          #          :details_available => h[],
          #          :entertainment => h[],
                    :lat => h["GeoLocation"]["Latitude"],
                    :lng => h["GeoLocation"]["Longitude"]
                    }
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
