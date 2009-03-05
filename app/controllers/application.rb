# Filters added to this controller apply to all controllers in the application.
# Likewise, all the methods added will be available for all controllers.

class ApplicationController < ActionController::Base
  helper :all # include all helpers, all the time

  # See ActionController::RequestForgeryProtection for details
  # Uncomment the :secret if you're not using the cookie session store
  protect_from_forgery # :secret => 'd0e54eef2637b2991a09c05f064723eb'
  
  
  less_authentication
  filter_parameter_logging "password"
  before_filter :check_user, :login_from_cookie, :login_required, :set_vars
  after_filter :store_location, :store_current_trip
  
  protected
  def set_vars
    session[:locale] = params[:locale] if params[:locale]
    I18n.locale = session[:locale] || I18n.default_locale
    if !@u.blank?
      RAILS_DEFAULT_LOGGER.debug("User is logged_in")
      @p = @u.person
      @t = @p.trips.current
    elsif !cookies[:person].nil?
      RAILS_DEFAULT_LOGGER.debug("Returning user")
      @p = Person.find(cookies[:person])
      @t = @p.trips.current
    else
      puts("Non returning user -> creating cookie")
      @p = Person.create
      @t = @p.trips.create
      cookies[:person] = {:value => @p.id}
      puts(cookies[:person].inspect)
    end
    
  end
  
  def store_current_trip
    return true unless @p
    @p.set_current_trip @t
  end
end
