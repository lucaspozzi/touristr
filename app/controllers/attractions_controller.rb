# used to have a hierachy in the URL: destinations/dest_id/attractions/attrac_id
# although both controllers handle destinations object

class AttractionsController < ApplicationController
  skip_before_filter :login_required, :except => [:edit, :update]
  before_filter :load_destination
  
  def show
    @attraction = Destination.find(params[:id])
    @attract_pics = @attraction.get_panoramio_pics(5)
  end
  
  def index
    redirect_to destination_path(@destination) unless @destination.city?
    @attractions = @destination.children_page(params[:page])
  end
  
  def edit
    @attraction = Destination.find(params[:id])
    @attraction.build_destination_content if @attraction.destination_content.nil?
  end
  
  def update
    @attraction = Destination.find(params[:id])
    @attraction.build_destination_content if @attraction.destination_content.nil?
    respond_to do |wants|
      wants.html do
        if @attraction.destination_content.update_attribute(:introduction, params[:introduction])
          flash.now[:notice] = "#{@attraction.name} #{t("has been updated")}"
          render :action => :show
        else
          flash.now[:error] = "#{@attraction.name} #{t("could not be updated")}"
          render :action => :edit
        end
      end
    end
  end

  
  def translate
    @attraction = Destination.find(params[:id])
    @destination = Destination.find(params[:destination_id])
    if @attraction.destination_content.nil?
      flash[:error] = "There is no content to be translated"
      redirect_to destination_attraction_path(@destination, @attraction) and return
    end
    
    @possible_translations = Array.new
    LOCALES_AVAILABLE.each { |sup_loc|
      if (@attraction.destination_content.locale.casecmp(sup_loc)!=0)
        @possible_translations << [t(sup_loc), sup_loc]
      end
    }
    logger.debug("Possible translation to: #{@possible_translations.inspect}")
    
    # remember user's locale
    user_locale = I18n.locale
    
    # loads original (en) destination_content (will be displayed)
    I18n.locale = @attraction.destination_content.locale
    @introduction = @attraction.destination_content.introduction
    
    # loads current traslation for the user's locale
    I18n.locale = user_locale
    return unless request.post?
    respond_to do |format|
      I18n.locale = params[:translation_language]
      params[:attraction_content].delete(:translation_language)
      if @attraction.destination_content.update_attributes(params[:attraction_content])
        format.html do
          redirect_to(destination_attraction_path(@destination, @attraction))
        end
        format.xml
      else
        format.html { render :action => "translate" }
        format.xml  { render :xml => @attraction.errors, :status => :unprocessable_entity }
      end  
    end
  end
  
  protected
  def load_destination
    @destination = Destination.find(params[:destination_id])
  end
end
