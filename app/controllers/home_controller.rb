class HomeController < ApplicationController
  skip_before_filter :login_required
  layout "plain"
  
  
  def index
    
  end
end
