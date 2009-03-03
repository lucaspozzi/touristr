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
  after_filter :store_location
  
  protected
  def set_vars
    @p = @u.person unless @u.blank?
  end
end
