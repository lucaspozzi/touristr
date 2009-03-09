

class EzrezHotel < EzrezBase
  
  def room_search params = {}
    check_params [:AirportCode, :CheckinDate, :CheckoutDate]
    params.reverse_merge!( {
      :MinimumResults   => 1,
      :BookingComponent => 'Room',
      :NumAdults        => 1,
      :NumChildren      => 0,
      :NumRooms         => 1
    })
    res = execute(:RoomSearch=>params)
  end
  
end
