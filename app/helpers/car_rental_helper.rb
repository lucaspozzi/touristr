module CarRentalHelper
  def display_ct_datetime(ct_datetime)
    year = ct_datetime.scan(/(\d\d\d\d)-\d\d-\d\dT\d\d:\d\d:\d\d/)
    month = ct_datetime.scan(/\d\d\d\d-(\d\d)-\d\dT\d\d:\d\d:\d\d/)
    day = ct_datetime.scan(/\d\d\d\d-\d\d-(\d\d)T\d\d:\d\d:\d\d/)
    hour = ct_datetime.scan(/\d\d\d\d-\d\d-\d\dT(\d\d):\d\d:\d\d/)
    minute = ct_datetime.scan(/\d\d\d\d-\d\d-\d\dT\d\d:(\d\d):\d\d/)
    " #{day}/#{month}/#{year} around #{hour}:#{minute} "
  end 
    
  def display_vehicle_size(size_code)
    case size_code
    when "1": "Mini"
    when "3": "Economy"
    when "4": "Compact"
    when "6": "Intermediate"
    when "7": "Standard"
    when "8": "Fullsize"
    when "9": "Luxury"
    when "10": "Premium"
    when "11": "Minivan"
    when "12": "12 passenger van"
    when "24": "Exotic"
    else ""
    end  
  end
  
  
end
