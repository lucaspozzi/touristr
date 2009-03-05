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
    if @u
      RAILS_DEFAULT_LOGGER.debug("User is logged_in".red)
      @p = @u.person
    elsif !cookies[:_touristr_person].nil?
      RAILS_DEFAULT_LOGGER.debug("Returning user".red)
      logger.debug(cookies[:_touristr_person].inspect.red)
      @p = Person.find(cookies[:_touristr_person])
    else
      logger.debug("Non returning user -> creating cookie".red)
      @p = Person.create
      cookies[:_touristr_person] = {:value => @p.id.to_s, :expires => 10.years.from_now}
      logger.debug(cookies[:_touristr_person].inspect.red)
    end
      @t = @p.current_trip
    
  end
  
  def store_current_trip
    return true unless @p
    @p.set_current_trip @t
  end
end
