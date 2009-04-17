class ActivitiesController < ApplicationController
  skip_before_filter :login_required
  before_filter :load_destination
  
  def search
    ez_activity = EzrezActivity.new
    
# sets some default values to test
    start_date = Time.now+2.weeks
    end_date = Time.now+3.weeks
    @start_date = params[:start_date] ||= "#{start_date.year}-#{start_date.month.to_s.rjust(2,"0")}-#{start_date.day.to_s.rjust(2,"0")}"
    @end_date = params[:end_date] ||= "#{end_date.year}-#{end_date.month.to_s.rjust(2,"0")}-#{end_date.day.to_s.rjust(2,"0")}"
    around_dest = Airport.find_within(250, :origin => @destination, :order => :distance)[0]
    puts(around_dest.inspect)

    @activities = ez_activity.activity_search(:AirportCode => around_dest.iata_code, :StartDate => @start_date, :EndDate=> @end_date)
    RAILS_DEFAULT_LOGGER.debug(@activities.inspect)
  end
  
  def index
  end

  
  private
  def load_destination
    @destination = Destination.find(params[:destination_id])
  end
  
end
