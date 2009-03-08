class DestinationsController < ApplicationController
  skip_before_filter :login_required
  
  def search
    logger.debug("DestinationController#search: param=#{params[:q]}")
    @destinations = Destination.s(params[:q])
    logger.debug("DestinationController#search: @destinations=#{@destinations}")
    respond_to do |wants|
      wants.json do
        ar = []
        @destinations.each { |d| ar << d.to_json(:only => [ :id, :name ]) }
        render :json=>ar.join("\n")
      end
    end
  end
  
  def show
    @destination = Destination.find(params[:id])
    if !@destination.city?
      logger.debug("Not a city...")
      link = ""
      @destination.children(10).each do |child_dest|
        link << "<a href=#{destination_path child_dest.id}>#{child_dest.name}</a><br>"
      end
      render :text => link
    end
  end
end
