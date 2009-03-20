class CarRentalController < ApplicationController
#  ssl_required :pay, :confirm
  skip_before_filter :login_required
  before_filter :current_page, :load_destination
#  layout "secure"

  include DateHelper
  
  def index
    redirect_to :action => "search"
  end
  
  def advanced_search
    @countries = Country.find(:all, :order => :country)
    session[:car]=nil
  end
  
  # step2
  def search
    begin
      @details = Hash.new
      @countries = Country.find(:all, :order => :country)
      if (params[:car].nil? && !flash[:car].nil?)
        RAILS_DEFAULT_LOGGER.debug("CarRentalcontroller#search : restoring flash[:car] to params")
        RAILS_DEFAULT_LOGGER.debug("CarRentalcontroller#search : now params = #{params.inspect} ")
          params[:car] = flash[:car]
      end
      if (params[:car].nil? || params[:car][:country_code].empty?) 
        RAILS_DEFAULT_LOGGER.debug("CarRentalcontroller#search : default")
        # default: airports around destination
        @pickup_locations = CarRental::PickupLocation.get_pickup_locations_at_airports(session)
        RAILS_DEFAULT_LOGGER.debug("@pickup_locations = #{@pickup_locations.inspect}")
        @return_locations = @pickup_locations
      else 
        RAILS_DEFAULT_LOGGER.debug("CarRentalcontroller#search : lookup all locations for <#{params[:car][:country_code]}>")
        # all available locations in country
        @country_code = params[:car][:country_code]
        @pickup_locations = CarRental::PickupLocation.find_by_country(@country_code,session)
         @return_locations = @pickup_locations      
      end
      # retrieve param in case we are redirected from step3
      if (!flash[:pickup_date].nil? && !flash[:return_date].nil?)
        RAILS_DEFAULT_LOGGER.debug("CarRentalcontroller#search : restoring params: pickup:<#{flash[:pickup_date]}>, return:<#{flash[:return_date]}>, details:<#{flash[:car].inspect}>")        
        @pickup_date = flash[:pickup_date]
        @return_date = flash[:return_date]
        @details = flash[:car]
      end
      @details[:driver_age] ||= "25"
      @details[:citizen_country_code] ||= "IE"
    rescue Exception => e
      flash.now[:error] = e.message
      @pickup_locations = Array.new if @pickup_location.nil?
      @return_locations = Array.new if @return_locations.nil?
    ensure
      @details[:driver_age] ||= "25"
      @details[:citizen_country_code] ||= "IE"     
    end
  end
    
  # step3
  def choose
    #raise params.inspect
    RAILS_DEFAULT_LOGGER.debug("CarRentalcontroller#choose : params = #{params.inspect}")
    begin
      pickup_datetime = datetime_from_params(params["pickup_date"])
      return_datetime = datetime_from_params(params["return_date"])
    rescue Exception => e
      flash[:error] = "You have entered an invalid date"
      flash[:car] = params[:car]
      flash[:pickup_date] = params["pickup_date"]
      flash[:return_date] = params["return_date"]
      redirect_to :action => "search" and return
    end
    begin
      if ((params["car"]["pickup_location"] == "--") || (params["car"]["return_location"]== "--"))
        raise CarRental::CarRentalException.new("Please select a valid location")
      end
      @cars = CarRental::CarTrawler::Gateway.find_vehicles(params["car"]["pickup_location"], pickup_datetime, params["car"]["return_location"], return_datetime, params["car"]["driver_age"], params["car"]["citizen_country_code"], request.remote_ip, params["car"]["currency"])

      @car_params = params[:car]
      @pickup_date = pickup_datetime
      @return_date = return_datetime
    rescue CarRental::CarRentalException => cre
    RAILS_DEFAULT_LOGGER.error("\n\n*********************\nCarRentalController#choose Exception - params[:car].inspect: #{params[:car].inspect}\n*********************\n\n")
      flash[:error] = cre.message
      flash[:car] = params[:car]
      flash[:pickup_date] = params["pickup_date"]
      flash[:return_date] = params["return_date"]
      redirect_to :action => "search"
    end
  end
  
  # step4
  def pay
    @countries = Country.find(:all, :order => :country)
    @restored_person = Hash.new
    @restored_address = Hash.new
    @restored_payment = Hash.new
    if request.post?   # we may be redirected from booking step, meaning no params...
       session[:car] = params[:car]
       session[:car][:reference] = params[:reference]
       @hide_payment_fields = (session[:car][:rate_qualifier].include?("POSTPAID"))
       @ask_for_airport_details = (session[:car][:reference][:at_airport] == "1")
    else
       @hide_payment_fields = (session[:car][:rate_qualifier].include?("POSTPAID")) unless session[:car].nil?
       @ask_for_airport_details = (session[:car][:reference][:at_airport] == "1") unless session[:car].nil?
       @restored_person = session[:person] unless session[:person].nil?
       RAILS_DEFAULT_LOGGER.debug("person = #{@restored_person.inspect}")
       @restored_address = session[:address] unless session[:address].nil?
       RAILS_DEFAULT_LOGGER.debug("address = #{@restored_address.inspect}")
       @restored_payment = session[:payment] unless session[:payment].nil?
       RAILS_DEFAULT_LOGGER.debug("payment = #{@restored_payment.inspect}")
    end
      #raise session[:car].inspect
  end

  # step5
  def confirm
    if (session[:car].nil?)
      redirect_to search_destination_car_rental_url(@destination) and return
    end
    #raise session[:car].inspect
    RAILS_DEFAULT_LOGGER.error("\n\n*********************\nCarRentalController#confirm - params.inspect: #{params.inspect}\n*********************\n\n")
    begin
      RAILS_DEFAULT_LOGGER.error("session[:car] : #{session[:car].inspect}")
      @reservation = CarRental::CarTrawler::Gateway.book_vehicle(session[:car][:reference], session[:car][:currency], session[:car][:pickup_location], session[:car][:return_location], session[:car][:pickup_date], session[:car][:return_date], session[:car][:citizen_country_code], params[:person], params[:address], params[:payment], session[:car][:driver_age], session[:car][:rate_qualifier]) 
      # reset session vars once book_vehicle succeeds
      session[:car] = nil
      session[:person] = nil
      session[:address] = nil
      session[:payment] = nil
    rescue CarRental::CarRentalException => cre
      RAILS_DEFAULT_LOGGER.error("CarRentalController#confirm - something went wrong. Exception: #{cre.message}")
      session[:person] = params[:person]
      session[:address] = params[:address]
      session[:payment] = params[:payment]
      flash[:error] = cre.message
      redirect_to pay_destination_car_rental_url(@destination, :host => "secure.touristr.com", :protocol => "https") and return
    rescue Exception => e
      RAILS_DEFAULT_LOGGER.error("\n\nCarRentalController#confirm - something went wrong. Exception #{e.message}\n\n")      
      session[:person] = params[:person]
      session[:address] = params[:address]
      session[:payment] = params[:payment]
      flash[:error] = e.message
      redirect_to pay_destination_car_rental_url(@destination, :host => "secure.touristr.com", :protocol => "https") and return
    end
   # TODO store the reservation data in the database so user can easily look it up
   # TODO generate an event for the trip planner for the car reservation
  end

#   def display_confirm
#     RAILS_DEFAULT_LOGGER.error("\n\n*********************\nCarRentalController#display_confirm - params.inspect: #{params.inspect}\n*********************\n\n")    
#     RAILS_DEFAULT_LOGGER.error("\n\n*********************\nCarRentalController#display_confirm - flash[:reservation].inspect: #{ flash[:reservation].inspect}\n*********************\n\n")    
#     if (flash[:reservation].nil?)
#       RAILS_DEFAULT_LOGGER.error("display_confirm with flash[:reservation].nil? == true")
#       redirect_to search_destination_car_rental_path(@destination) and return
#     else
#       RAILS_DEFAULT_LOGGER.error("\n\n*********************\nCarRentalController#display_confirm - OK!")    
#       @reservation = flash[:reservation]      
#     end
#   end
# 
#   # Returns pickup location based on city, geo-coordinates, or airport code
#   # limited to 100 results, need to use CT_VehLocSearchRQ to bypass this OTA limit
#   # 
#   # Integration:
#   # if we have a current leg, we use the destination to search for pickup location, 
#   # and then use the first pickup loction returned.
#   # Then if we have dates for this leg, we use them too. Otherwise, find_available_vehicles 
#   # will use its defaults...
#   def find_pickup_locations
#     begin
#       # Do we have a leg? If so then reuse destination and dates from leg... 
#       if (Trip::Trip.does_current_destination_have_a_leg?(session))
#         trip = Trip::Trip.get_trip_for_user(session)
#         leg = trip.get_leg_for_destination(Navigation::BreadCrumbManager.get_current_destination_id(session))
#         current_destination = leg.destination
# 
#         @pickup_date = leg.start_date
#         @return_date = leg.end_date
#         RAILS_DEFAULT_LOGGER.debug("CarsController.find_pickup_location: using leg dates #{@pickup_date}-#{@return_date}")
#         
#       # Form may have been submited...
#       elsif (!params[:submit].nil?)
#         current_destination = Destination::Destination.find(Navigation::BreadCrumbManager.get_current_destination_id(session))
#         @pickup_date = convert_datepicker_date_to_yyyy_mm_dd(params[:pickup_date])
#         @return_date = convert_datepicker_date_to_yyyy_mm_dd(params[:return_date])
#         pickup_location_id = params[:pickup_location_id]
#         return_location_id = params[:return_location_id]
# 
#         session[:destination_search_details] = Hash.new unless session[:destination_search_details]
#         session[:destination_search_details][current_destination.id] = Hash.new unless session[:destination_search_details][current_destination.id]
#         session[:destination_search_details][current_destination.id]["car_pickup_date"] = @pickup_date
#         session[:destination_search_details][current_destination.id]["car_pickup_loc_id"] = pickup_location_id
#         session[:destination_search_details][current_destination.id]["car_return_date"] = @return_date
#         session[:destination_search_details][current_destination.id]["car_dropoff_loc_id"] = return_location_id
#         pickup_location_id = params[:pickup_location_id]
#         return_location_id = params[:return_location_id]
#         puts("pickup_location_id: #{pickup_location_id}")
#         puts("return_location_id: #{return_location_id}")
#         RAILS_DEFAULT_LOGGER.debug("CarsController.find_pickup_location: using form data #{@pickup_date} in #{pickup_location_id}; #{@return_date} in #{return_location_id}")
#           
#       # Use what we may know (any search detail for this destination??)
#       elsif (!session[:destination_search_details].nil? && 
#               !session[:destination_search_details][Navigation::BreadCrumbManager.get_current_destination_id(session)].nil?)
#         RAILS_DEFAULT_LOGGER.debug("CarsController.find_pickup_location: trying to be smart...")
#         current_destination = Destination::Destination.find(Navigation::BreadCrumbManager.get_current_destination_id(session))
#         
#         @pickup_date = (session[:destination_search_details][current_destination.id]["car_pickup_date"] ||
#           session[:destination_search_details][current_destination.id]["hotel_search_arrival_date"])
#         @return_date = (session[:destination_search_details][current_destination.id]["car_return_date"] ||
#            session[:destination_search_details][current_destination.id]["hotel_search_departure_date"])
#         pickup_location_id = session[:destination_search_details][current_destination.id]["car_pickup_loc_id"]
#         return_location_id = session[:destination_search_details][current_destination.id]["car_dropoff_loc_id"]
#         
# #        # debug purpose
# #        if (!session[:destination_search_details][current_destination.id]["car_return_date"].nil?)
# #          debug = "we already had a pickup_date search for this destination"
# #        elsif(!session[:destination_search_details][current_destination.id]["hotel_search_arrival_date"].nil?)
# #          debug = "we already had a hotel arrival date search for this destination"
# #        end
# #        if (!session[:destination_search_details][current_destination.id]["car_return_date"].nil?)
# #          debug << " and we already had a return_date search for this destination"
# #        elsif(!session[:destination_search_details][current_destination.id]["hotel_search_departure_date"].nil?)
# #          debug << " and we already had a hotel departure date search for this destination"
# #        end
# #        RAILS_DEFAULT_LOGGER.debug("CarsController.find_pickup_location: #{debug}")
#         
#       # render the form  
#       else
#         RAILS_DEFAULT_LOGGER.debug("CarsController.find_pickup_location: generating list of pickup/return locations")
#         @need_details = true
#         @pickup_locations = CarRental::PickupLocation.get_pickup_locations_at_airports(session)
#         @return_locations = CarRental::PickupLocation.get_dropoff_locations_at_airports(session, @pickup_locations)
#         
#         render :action => "find_available_vehicles" and return
#       end
#       
#       car_search_params = Hash.new
#         
#       @pickup_locations = CarRental::PickupLocation.get_pickup_locations_at_airports(session)
#       # Makes things easy for the time: we display car for the first location returned
#       if (@pickup_locations.length >= 1)
#         car_search_params = Hash.new
#         car_search_params[:pickup_location_id] = (pickup_location_id.blank?)?@pickup_locations[0].id : pickup_location_id
#         car_search_params[:return_location_id] = (return_location_id.blank?)?@pickup_locations[0].id : return_location_id
# 
#         car_search_params["pickup_date"] = @pickup_date
#         car_search_params["return_date"] = @return_date
#         redirect_to(:action => "find_available_vehicles", :params => car_search_params)
#       end
#       rescue CarRental::CarRentalException => e
#       flash[:error] = e.message
#     end
#     # in case we get parameters we don't understand
#     @pickup_locations = Array.new unless @pickup_locations
#   end
#   
#   # Returns available vehicles for a specified vehiclepickup location and 
#   # defaults: 
#   # pickup_date: one month ahead
#   # pickup_time: 9:00 am
#   # return_date: pickup_date + 1 week
#   # return_time: 6:00 pm
#   # return_location: pickup_location
#   def find_available_vehicles
#     # pickup params
#     @pickup_location_id = params[:pickup_location_id]
#     @pickup_date = params[:pickup_date]    
#     @pickup_date = Date.parse(@pickup_date.to_s)
#     @pickup_time = params[:pickup_time]
#     @pickup_time ||= "09:00:00"
# 
#     # return params
#     @return_location_id = params[:return_location_id]
#     @return_date = params[:return_date]
#     @return_date = Date.parse(@return_date.to_s)
#     @return_time = params[:return_time]
#     @return_time ||= "18:00:00"
#     
#     @driver_age = params[:driver_age]  
# #defult value for test. Should be removed for prod
#     @driver_age ||= "30"
#     
#     @driver_country_code = params[:driver_country_code]
# #defult value for test. Should be removed for prod
#     @driver_country_code ||= "IE"
#     
#     begin
#       @pickup_locations = CarRental::PickupLocation.get_pickup_locations_at_airports(session)
#       @return_locations = CarRental::PickupLocation.get_dropoff_locations_at_airports(session, @pickup_locations)
#       @available_vehicles_results = CarRental::Vehicle.find_vehicles(params[:vehicle_class], params[:pickup_location_id], @pickup_date, @pickup_time, params[:return_location_id], @return_date, @return_time, @driver_age, @driver_country_code, request.remote_ip, session)
# 
#       # To highligh the locations. We retrieve their name based on its id
#       @return_locations.each do |loc|
#         if (loc.id == @pickup_location_id)
#           @available_vehicles_results.pickup_location_name = loc.name
#         end
#         if (loc.id == @return_location_id)
#           @available_vehicles_results.return_location_name = loc.name
#         end
#       end
#       
#     rescue CarRental::CarRentalException => e
#       # provides value so that view can be generated without errors
#       @available_vehicles_results = CarRental::AvailableVehiclesResponse.new
#       @available_vehicles_results.pickup_datetime = @pickup_date
#       @available_vehicles_results.pickup_location_name = params["pickup_location_name"]
#       @available_vehicles_results.return_datetime = @return_date
#       @available_vehicles_results.return_location_name = params["pickup_location_name"]
#       
#       flash[:error] = e.message
#     end
#   end
  
  private
  
  def current_page
    @current_page = 'cars'
  end

  def load_destination
    puts("destination_id: #{params[:destination_id]}")
    @destination = Destination.find(params[:destination_id])
    BreadCrumbManager.mark_destination_as_visited(session, @destination)
  end

  def datetime_from_params(date_param)          
#    "#{date['year']}-#{date['month'].rjust(2, '0')}-#{date['day'].rjust(2, '0')}T#{date['hour'].rjust(2, '0')}:#{date['minute'].rjust(2, '0')}:00" 
    convert_datepicker_date_to_yyyy_mm_dd(date_param["date"]) + "T#{date_param["hour"]}:#{date_param["minute"]}:00"  
  end
  
end
