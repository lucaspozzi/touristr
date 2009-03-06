class HotelsController < ApplicationController
  skip_before_filter :login_required
  
  def index
    @hotels = Hotel.all
  end
  
  
end
