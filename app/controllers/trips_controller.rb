class TripsController < ApplicationController
  before_filter :setup, :except=>[:show]
  before_filter :setup_show, :only=>[:show]
  skip_before_filter :login_required, :only=>[:show]
  
  def show
  end
  
  
  protected
  def setup_show
    #allow public trips and my trips
    t = params[:id] ? Trip.find(params[:id]) : @p.trips.current
    return @t = @trip = t if t.public? || t.in?(@p.trips)
    raise ActiveRecord::RecordNotFound
  end
  
end
