class DestinationsController < ApplicationController
  skip_before_filter :login_required, :except => [:edit, :update]
  NB_PICS_FOR_DEST = 8
  
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
    BreadCrumbManager.mark_destination_as_visited(session, @destination)
    RAILS_DEFAULT_LOGGER.error(BreadCrumbManager.get_current_destination_id(session))
    @destination.increment_click_counter if params[:xs4f] == 'qf3r'
    @t.add @destination if @destination.city?
    @destinations = @destination.children
    @dest_pics = @destination.get_pictures
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
      flash[:error] = t("There is no content to be translated")
      redirect_to destination_path(@destination) and return
    end
    
    @possible_translations = Array.new
    LOCALES_AVAILABLE.each { |sup_loc|
      if (@destination.destination_content.locale.casecmp(sup_loc)!=0)
        @possible_translations << [t(sup_loc), sup_loc]
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
  
  def edit
    @destination = Destination.find(params[:id])    
    @destination.build_destination_content if @destination.destination_content.nil?
  end
  
  def update
    @destination = Destination.find(params[:id])
    @destination.build_destination_content if @destination.destination_content.nil?
    respond_to do |wants|
      wants.html do
        if @destination.destination_content.update_attributes(params[:destination])
            flash.now[:notice] = "#{@destination.name} #{t("has been updated")}"
            render :action => :show
        else
            flash.now[:error] = "#{@destination.name} #{t("could not be updated")}"
            render :action => :edit
        end
      end
    end
  end
  
  def add_photo
    @destination = Destination.find(params[:id])
    if @destination.destination_pictures.create(params[:destination_pictures])
      flash[:success] = t("Picture successfully added.")
    else
      flash[:error] = t("Something went wrong... Please try again.")
    end
    redirect_to(destination_path(@destination))
  end
  
end
