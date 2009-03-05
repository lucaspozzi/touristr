require File.dirname(__FILE__) + '/../test_helper'

class AccountsControllerTest <  ActionController::TestCase
  # Be sure to include AuthenticatedTestHelper in test/test_helper.rb instead
  # Then, you can remove it from this and the units test.
  include LessAuthenticationTestHelper



  def test_should_login_and_redirect
    post :login, :login => 'quentin', :password => 'test'
    assert session[:user]
    assert assigns['u']
    assert_response :redirect
  end

  def test_should_fail_login_and_not_redirect
    post :login, :login => 'quentin', :password => 'bad password'
    assert_nil session[:user]
    assert_response :success
  end
  
  
  
  
  def test_forgot_no_email
    post :login, :email=>'asdf'
    assert_nil session[:user]
    assert_response :success
    assert_equal nil, flash[:notice]
    assert_match "Could not find that email address. Try again.", @response.body 
  end
  
  
  
  def test_forgot_good_email
    assert u = users(:first)
    assert p = u.crypted_password
    post :login, :email=>users(:first).person.email
    assert_nil session[:user]
    assert_response :success
    assert_match "A new password has been mailed to you.", @response.body
    assert_not_equal(assigns(:p), u.crypted_password)
  end
  
  
  
  # 
  # def test_verify_email
  #   assert u = users(:first)
  #   post :activate, :code=>u.email_verification
  #   assert_nil(session[:user])
  #   assert_response :redirect
  #   assert_equal nil, flash[:error]
  #   assert_equal 'Your email has been verified.', flash[:notice]
  # end
  # 
  # 
  # 
  # 
  # def test_fail_verify_email
  #   assert u = users(:first)
  #   post :activate, :code=>u.email_verification + "1"
  #   assert_nil(session[:user])
  #   assert_response :redirect
  #   assert_equal nil, flash[:notice]
  #   assert_equal 'Code not find that verification code.', flash[:error]
  # end
  
  
  

  def test_should_allow_signup
    assert_difference "User.count" do
      create_user
      assert_response :redirect
    end
    assert_not_nil(assigns(:u))
    assert_not_nil(assigns(:u).person)
  end

  def test_should_require_login_on_signup
    assert_no_difference "User.count" do
      create_user(:login => nil)
      assert assigns(:u).errors.on(:login)
      assert_response :success
    end
  end

  def test_should_require_password_on_signup
    assert_no_difference "User.count" do
      create_user(:password => nil)
      assert assigns(:u).errors.on(:password)
      assert_response :success
    end
  end

  def test_should_require_password_confirmation_on_signup
    assert_no_difference "User.count" do
      create_user(:password_confirmation => nil)
      assert assigns(:u).errors.on(:password_confirmation)
      assert_response :success
    end
  end
  
  
  def test_should_fail_signup_cuz_no_terms
    assert_no_difference 'User.count' do
      post :signup, {:user => { :login => 'lquire', :email => 'lquire@example.com',
        :password => 'lquire', :password_confirmation => 'lquire' }}
    end
    assert_match "Please review and accept the terms of service.", @response.body
    assert_response :success
    assert !assigns(:u)
  end
  
  # this should be uncommented once the beta signup code is no longer used
  # def test_should_require_email_on_signup
  #   assert_no_difference User, :count do
  #     create_user(:email => nil)
  #     assert assigns(:user).errors.on(:email)
  #     assert_response :success
  #   end
  # end

  def test_should_logout
    login_as :first
    get :logout
    assert_nil session[:user]
    assert_response :redirect
  end

  def test_should_remember_me
    post :login, :login => 'quentin', :password => 'test', :remember_me => "1"
    assert_not_nil @response.cookies["auth_token"]
  end

  def test_should_not_remember_me
    post :login, :login => 'quentin', :password => 'test', :remember_me => "0"
    assert_nil @response.cookies["auth_token"]
  end
  
  def test_should_delete_token_on_logout
    login_as :first
    get :logout
    assert_equal [], @response.cookies["auth_token"]
  end

  def test_should_login_with_cookie
    users(:first).remember_me
    @request.cookies["auth_token"] = cookie_for(:first)
    get :login
    assert @controller.send(:logged_in?)
  end

  def test_should_fail_expired_cookie_login
    users(:first).remember_me
    users(:first).update_attribute :remember_token_expires_at, 5.minutes.ago
    @request.cookies["auth_token"] = cookie_for(:quentin)
    get :login
    assert !@controller.send(:logged_in?)
  end

  def test_should_fail_cookie_login
    users(:first).remember_me
    @request.cookies["auth_token"] = auth_token('invalid_auth_token')
    get :login
    assert !@controller.send(:logged_in?)
  end

  protected
    def create_user(options = {}, signup_code = '1234')
      post :signup, {:user => { :login => 'lquire', :email => 'lquire@example.com',
        :password => 'lquire', :password_confirmation => 'lquire' }.merge(options), :accepts_terms=>'1'}
    end
    
    def auth_token(token)
      CGI::Cookie.new('name' => 'auth_token', 'value' => token)
    end
    
    def cookie_for(user)
      auth_token users(user).remember_token
    end
end
