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
    @arr_airport = params[:arr_airport] ||= Airport.find_closest(:origin => @destination).iata_code
    @flights = ez_flight.flight_search(:Cabin => "coach", :FromAirport => @dep_airport, :ToAirport => @arr_airport, :DepartureDateTime => @dep_date, :ReturnDateTime=> @ret_date)
  end
  
  
  
  private
  def load_destination
    @destination = Destination.find(params[:destination_id])
  end
  
end
