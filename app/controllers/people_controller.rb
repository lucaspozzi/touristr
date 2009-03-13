class PeopleController < ApplicationController
  skip_before_filter :login_required, :only=>[:new, :create]
  skip_after_filter :store_current_trip, :only=>[:destroy]
  before_filter :setup, :except=>[:index, :new, :create]


  def new
    render
  end
  
  def create
    @person = @p.create_and_add_to_trip params[:person], @t, params[:message]
    respond_to do |wants|
      wants.js do
        render :update do |page|
          if @person.new_record?
            page.alert @person.errors.to_s
          else
            page << "TB_remove();"
            page.replace 'tripControl', :partial=>'shared/trip_control'
          end
        end
      end
    end
  end

  def index
    redirect_to person_path(@p)
  end
  def show
    render :action => "edit" and return if @u && @u == @user
  end
  def edit
    render
  end

  def update
    case params[:switch]
    when 'name','image'
      if @person.update_attributes params[:person]
        flash[:notice] = "Settings have been saved."
        redirect_to edit_person_url( @person)
      else
        flash.now[:error] = @person.errors
        render :action => :edit
      end
    # when 'gcalendar'
    #   @person.update_attributes params[:person]
    #   flash[:notice] = "Settings have been saved and Google calendar synchronized."
    #   flash[:notice] = "Settings have been saved, but that user name and password don't seem to be correct." unless @person.get_gcalendar
    #   redirect_to edit_person_url( @person)
    # when 'aim'
    #   @person.reset_aim params[:person][:aim]
    #   redirect_to edit_person_url(@person)
    #   # we don't need an else render error here because this should never fail
    when 'password'
      if @user.change_password(params[:verify_password], params[:new_password], params[:confirm_password])
        flash[:notice] = "Password has been changed."
        redirect_to edit_person_url(@person)
      else
        flash.now[:error] = @user.errors
        render :action=> :edit
      end
    else
      RAILS_ENV == 'test' ? render( :text=>'') : raise( 'Unsupported swtich in action')
    end
  end


  
  def delete_icon    
  respond_to do |wants|
    @person.update_attribute :icon, nil
    wants.js {render :update do |page| page.visual_effect 'Puff', 'person_icon_picture' end  }
    # we don't need an else render error here because this should never fail
    # else
    #   wants.js {render :update do |page| page.alert 'Could not delete icon.' end}
    #   end
    end      
  end


  def destroy
    respond_to do |wants|
     @user.destroy
      cookies[:auth_token] = {:expires => Time.now-1.day, :value => "", :domain =>".#{$domain}" }
      session[:user] = nil
      wants.js do
        render :update do |page| 
          page.alert('Your user account, and all data, have been deleted.')
          page << 'location.href = "/";'
        end
      end
    end
  end







  protected
  def setup
    @person = @p
    @user = @u
   redirect_to person_path(@p) unless @p == Person.find(params[:id])

  end



end
