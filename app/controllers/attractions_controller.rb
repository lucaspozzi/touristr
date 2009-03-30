# used to have a hierachy in the URL: destinations/dest_id/attractions/attrac_id
# although both controllers handle destinations object

class AttractionsController < ApplicationController
  skip_before_filter :login_required, :except => [:edit, :update]
  before_filter :load_destination
  
  require 'RMagick'
  
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
        if @attraction.destination_content.update_attributes(params[:attraction])
          if params[:attraction][:picture].blank?
            flash.now[:notice] = "#{@attraction.name} #{t("has been updated")}"
            render :action => :show
          else
            flash.now[:notice] = "#{@attraction.name} #{t("has been updated, now select the part of the image to be displayed")}"
            session[:crop_token] = ENV['CROP_TOKEN']
            @attraction.destination_content.cropped = false;
            @attraction.destination_content.save
            redirect_to (crop_picture_destination_attraction_path(@destination, @attraction))
          end
        else
          flash.now[:error] = "#{@attraction.name} #{t("could not be updated")}"
          render :action => :edit
        end
      end
    end
  end

  def crop_picture
    require 'open-uri'
    # # ensure this is not a pasted URL
    # # get rid of subdomains! and take care of localhost:3000...
    # if (! ENV['app-host'].index('.').nil?)
    #   domain_name = ENV['app-host'][ENV['app-host'].index('.')+1,ENV['app-host'].size-1]
    # else
    #   domain_name = ENV['app-host']
    # end
    
    # if ((request.referer.nil?) || !(request.referer =~ /\Ahttp:\/\/(\w+\.)?#{domain_name}\/.*/))
    #   if (request.referer.nil?)
    #     RAILS_DEFAULT_LOGGER.error("AttractionsController#crop_picture: exit because request.referer is nil!")
    #   else
    #     RAILS_DEFAULT_LOGGER.error("AttractionsController#crop_picture: exit because we could not recognize domain name <#{domain_name}> in referer <#{request.referer}>")
    #   end
    #   flash[:error] = "You cannot access this directly"
    #   redirect_to '/' and return
    # end
    
    @attraction = Destination.find(params[:id])
    if (session[:crop_token] == ENV['CROP_TOKEN'])
      # we arrive from create/update action, user is granted access to the cropping view
      session[:crop_token] = nil
      return
    elsif (!request.post?)
      RAILS_DEFAULT_LOGGER.error("AttractionsController#crop_picture: exit because request is not a POST")
      # not arriving from the cropping form. Maybe a link on the site, but this is not allowed!
      flash[:error] = "You cannot access this directly"
      redirect_to '/' and return
    end
    # A form from the site has been submitted to this url -> cropping 
    # we need to download the reduced file, crop it and then store it back to S3 as the original
    tmp_local_file = "#{RAILS_ROOT}/public/images/#{@attraction.destination_content.picture_file_name}"
    open(tmp_local_file,"w").write(open(@attraction.destination_content.picture.url(:reduced)).read) 
    picture = Magick::ImageList.new(tmp_local_file)
    cropped_picture = picture.crop(params[:x1].to_i, params[:y1].to_i, params[:x2].to_i, params[:y2].to_i)
    #now override the reduced file with the cropped one
    cropped_picture.write("#{tmp_local_file}")
    #need to save this file manually back to s3
    s3 = RightAws::S3.new('0NBB1TQQCMBXPECP6DG2', 'zJoOj18M/gKZzGm/QaMnK0ISzJpZ6e3L21uZOWXJ')
    bucket = s3.bucket('touristr-eu-img')    
    key = bucket.key("attractions/#{@attraction.destination_content.id}/original/#{@attraction.destination_content.picture_file_name}")
    key.put(File.open(tmp_local_file), 'public-read')
    #delete the temporary file
    File.delete(tmp_local_file) if File.exist?(tmp_local_file)
    @attraction.destination_content.cropped = true
    @attraction.destination_content.save
    
    redirect_to(destination_attraction_path(@destination, @attraction))
    
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
