class HotelsController < ApplicationController
  skip_before_filter :login_required
  before_filter :load_destination
  
  def index
    @hotels = Hotel.all
  end
  
  def search
    ez_hotel = EzrezHotel.new
    cidate = Time.now+2.weeks
    codate = Time.now+3.weeks
    @ci ||= params[:arrival] ||= "#{cidate.year}-#{cidate.month.to_s.rjust(2,"0")}-#{cidate.day.to_s.rjust(2,"0")}"
    @co ||= params[:departure] ||= "#{codate.year}-#{codate.month.to_s.rjust(2,"0")}-#{codate.day.to_s.rjust(2,"0")}"
    begin
      @rooms = ez_hotel.room_search(:CheckinDate => @ci, :CheckoutDate => @co, :NumAdults => @t.number_of_adults, :NumChildren => @t.number_of_children,:Where => {:Location => "#{@destination.name}, #{@destination.country.country}"})
    rescue Exception=>e
      RAILS_DEFAULT_LOGGER.error("HotelsController#search - Exception: #{e.message}")
      @room = Array.new
      flash.now[:error] = "Sorry, we could not find a hotel in #{@destination.name}, #{@destination.country.country}"
    end
  end
  
  def book
    booking_descriptor = params[:booking_descriptor]
    RAILS_DEFAULT_LOGGER.error("\nHotel Booking: #{booking_descriptor}\n")
    redirect_to destination_path(@destination)
  end
  
  private
  def load_destination
    @destination = Destination.find(params[:destination_id])
  end
  
end
