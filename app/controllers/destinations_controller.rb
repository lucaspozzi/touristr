class DestinationsController < ApplicationController
  skip_before_filter :login_required
  
  
  def search
    @destinations = Destination.search(params[:q])
    respond_to do |wants|
      wants.html {render :text=>%w(a b c d e).map{|d| "<a href='blah'>#{d}</d>\n"}}
      wants.json { render :json=>@destinations.to_json }
    end
  end
  
  
  
  
end
