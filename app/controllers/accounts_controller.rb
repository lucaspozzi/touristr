class AccountsController < ApplicationController
	skip_before_filter :login_required, :except => :logout
	skip_after_filter :store_location
#	layout 'plain'
	
	




  def login
    redirect_back_or_default(home_path) and return if @u
    return unless request.post?
    
    
    #plays double duty login/forgot (due to the ajax nature of the login/forgot form)
    if params[:email] && params[:email].size > 0
      u = Person.find_by_email(params[:email]).user rescue nil
      flash.now[:error] = "Could not find that email address. Try again." and return if u.nil?

      @pass = u.forgot_password #must be @ variable for function tests
      AccountMailer.deliver_forgot_password(u, @pass)
      flash[:notice] = "A new password has been mailed to you."
    else
      params[:login] ||= params[:user][:login] if params[:user]
      params[:password] ||= params[:user][:password] if params[:user]
      self.user = User.authenticate(params[:login], params[:password])
      if @u
        redirect_back_or_default home_path
        remember_me if params[:remember_me] == "1"
        flash[:notice] = "Hello #{@u.full_name}"
      else
        flash.now[:error] = "Uh-oh, login didn't work. Do you have caps locks on? Try it again."
      end
    end
  end
  
  
  
  

  def logout
    cookies[:auth_token] = {:expires => Time.now-1.day, :value => "" }
    session[:user] = nil
    session[:return_to] = nil
    flash[:notice] = "You have been logged out."
    redirect_to '/'
  end
  
  
  
  
  
  
  
  
  



  def signup
    redirect_back_or_default(home_path) and return if @u
          
    return unless request.post?
    
    unless params[:accepts_terms] == '1'
      flash.now[:error] = "Please review and accept the terms of service."
      return
    end
    u                       = User.new
    u.login                 = params[:user][:login]
    u.password              = params[:user][:password]
    u.password_confirmation = params[:user][:password_confirmation]
    u.email                 = params[:user][:email]
    @u = u
    if u.save
      self.user = u
    
      
      remember_me if params[:remember_me] == "1"
      flash[:notice] = "Thanks for signing up!"
      AuthMailer.deliver_registration(:subject=>'new touristrr registration', :body => "username = '#{@u.login}'", :recipients=>%w(jan@touristr.com conor@touristr.com arnaud@touristr.com))
      redirect_to home_url
    else  
      @user = @u
      params[:user][:password] = params[:user][:password_confirmation] = ''
      flash.now[:error] = @u.errors
      self.user = u# if RAILS_ENV == 'test'
    end
  end
  
  
  
  
  
  
  
  

protected

  def remember_me
    self.user.remember_me
    cookies[:auth_token] = {
      :value => self.user.remember_token ,
      :expires => self.user.remember_token_expires_at
    }
  end
end








class AuthMailer < ActionMailer::Base
  def registration(options)
    self.generic_mailer(options)
  end
end