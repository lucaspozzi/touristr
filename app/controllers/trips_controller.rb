class TripsController < ApplicationController
  before_filter :setup, :except=>[:show, :private]
  before_filter :setup_show, :only=>[:show]
  skip_before_filter :login_required

  def show
  end

  def edit
    render
  end

  def private
    @trip = Trip.find_by_private_identifier params[:id]
    raise ActiveRecord::RecordNotFound unless @trip
    @t = @trip if @trip.in?(@p.trips)
    respond_to do |wants|
      wants.html { render :action=>:show }
    end
  end


  def update
    respond_to do |wants|
      wants.js do
        render :update do |page|
          if @t.update_attributes params[:trip]
            page << "TB_remove(); msg('Saved');"
          else
            page.alert @t.errors.to_s
          end
        end
      end
    end
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
