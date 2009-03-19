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
    @destination = Destination.find(params[:id])
    redirect_to destination_path(@destination) and return unless @destination.city?
    if @destination.destination_content.nil?
      flash[:error] = "There is no content to be translated"
      redirect_to destination_path(@destination) and return
    end
    
    @possible_translations = Array.new
    LOCALES_AVAILABLE.each { |sup_loc|
      if (@destination.destination_content.locale.casecmp(sup_loc)!=0)
        @possible_translations << [sup_loc, sup_loc]
      end
    }
    logger.debug("Possible translation to: #{@possible_translations.inspect}")
    
    # remember user's locale
    user_locale = I18n.locale
    
    # loads original (en) destination_content (will be displayed)
    I18n.locale = @destination.destination_content.locale
    @introduction = @destination.destination_content.introduction
    @overview = @destination.destination_content.overview
    @attractions = @destination.destination_content.attractions

    # loads current traslation for the user's locale
    I18n.locale = user_locale
    @destination = Destination.find(params[:id])
    
    return unless request.post?
    respond_to do |format|
      I18n.locale = params[:translation_language]
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
