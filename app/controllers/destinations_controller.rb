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
      redirect_to destination_attraction_path(@destination.parent, @destination) and return
    elsif @destination.area?
      @destinations = @destination.children(10)
      render :action => :show_children and return  
    else
      link = ""
      render :action => :show_children
    end
  end
  
  def translate
    I18n.locale = I18n.default_locale
    @destination = Destination.find(params[:id])
    @introduction = @destination.destination_content.introduction
    @overview = @destination.destination_content.overview
    @attractions = @destination.destination_content.attractions
    @possible_translations = Array.new
    
    I18n.locale = "fr"
    @destination = Destination.find(params[:id])
    
    SUPPORTED_LOCALES.each do |loc|
      @possible_translations << loc
    end
    return unless request.post?
    respond_to do |format|
      I18n.locale = params[:destination_content][:translation_language]
      params[:destination_content].delete(:translation_language)
      if @destination.destination_content.update_attributes(params[:destination_content])
        format.html do
          redirect_to(destination_path(@destination))
        end
        format.xml
      else
        format.html { render :action => "translate" }
        format.xml  { render :xml => @destination.errors, :status => :unprocessable_entity }
      end  
    end
  end
end
