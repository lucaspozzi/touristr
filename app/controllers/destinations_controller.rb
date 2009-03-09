class DestinationsController < ApplicationController
  skip_before_filter :login_required
  
  def search
    logger.debug("DestinationController#search: param=#{params[:q]}")
    @destinations = Destination.s(params[:q])
    logger.debug("DestinationController#search: @destinations=#{@destinations}")
    respond_to do |wants|
      wants.json do
        ar = []
        @destinations.each { |d|  parent = d.city? ? ", #{d.parent}" : ""
                                  ar << d.to_json(:only => [ :id, :name],
                                                  :methods => :parent,
                                                  :include => {:country => {:only => :country}})}
        render :json=>ar.join("\n")
      end
    end
  end
  
  def show 
    @destination = Destination.find(params[:id])
    @destination.increment_click_counter if params[:xs4f] == 'qf3r'
    @t.add @destination if @destination.city?
    @destinations = @destination.children
    return if @destination.city?
    if @destination.attraction?
      @attraction = @destination
      @destination = @attraction.parent
      render :action => :show_attraction and return
    elsif @destination.area?
      @destinations = @destination.children(10)
      render :action => :show_children and return  
    else
      link = ""
      render :action => :show_children
    end
  end
end
