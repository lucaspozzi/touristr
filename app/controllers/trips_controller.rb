class TripsController < ApplicationController
  before_filter :setup, :except=>[:show]
  before_filter :setup_show, :only=>[:show]
  skip_before_filter :login_required
  
  def show
  end
  
  def edit
    
  end
  
  protected
  
  def setup
    @t = @trip = params[:id] ? Trip.find(params[:id]) : @p.trips.current
  end
  
  def setup_show
    #allow public trips and my trips
    trip = params[:id] ? Trip.find(params[:id]) : @p.trips.current
    return @t = @trip = trip if trip.public? || trip.in?(@p.trips)
    raise ActiveRecord::RecordNotFound
  end
  
end
