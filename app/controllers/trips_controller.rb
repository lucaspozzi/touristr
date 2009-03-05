class TripsController < ApplicationController
  skip_before_filter :login_required, :only=>[:show]
  
  def show
    setup_trip
  end
  
  
  protected
  def setup_trip
    if params[:id]
      @t = @trip = @p.trips.find(params[:id])
    else
      @t = @trip = @p.trips.current
    end
  end
  
end
