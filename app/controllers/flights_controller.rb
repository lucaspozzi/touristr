class FlightsController < ApplicationController
  skip_before_filter :login_required
  before_filter :load_destination
  
  def search
#    return if request.get?
    ez_flight = EzrezFlight.new
    
# sets some default values to test
    dep_date = Time.now+2.weeks
    ret_date = Time.now+3.weeks
    @dep_date = params[:dep_date] ||= "#{dep_date.year}-#{dep_date.month.to_s.rjust(2,"0")}-#{dep_date.day.to_s.rjust(2,"0")}"
    @ret_date = params[:ret_date] ||= "#{ret_date.year}-#{ret_date.month.to_s.rjust(2,"0")}-#{ret_date.day.to_s.rjust(2,"0")}"
    @dep_airport = params[:dep_airport] ||= "NCE"

    arr_airports = params[:arr_airport] ||= Airport.find_within(250, :origin => @destination, :order => :distance)

    # we can either have a IATA code (String) or an array of Airports
    if arr_airports.instance_of?(String)
      @arr_airport = arr_airports
      @flights = ez_flight.flight_search(:Cabin => "coach", :FromAirport => @dep_airport, :ToAirport => arr_airports, :DepartureDateTime => @dep_date, :ReturnDateTime=> @ret_date)
    else
      arr_airports.each do |arr_airp|
        @arr_airport = arr_airp.iata_code
        @flights = ez_flight.flight_search(:Cabin => "coach", :FromAirport => @dep_airport, :ToAirport => arr_airp.iata_code, :DepartureDateTime => @dep_date, :ReturnDateTime=> @ret_date)
        break if !@flights.nil? # Stop if we have found a flight to an airport close to the destination
      end
    end
  end
  
  def index
  end
  
  private
  def load_destination
    @destination = Destination.find(params[:destination_id])
  end
  
end
