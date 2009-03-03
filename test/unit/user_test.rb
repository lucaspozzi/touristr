require File.dirname(__FILE__) + '/../test_helper'

class UserTest < Test::Unit::TestCase
  include LessAuthenticationHelper

  def test_change_password    
   assert u = users(:first)
   assert p = u.crypted_password
   assert id = u.id
   assert u2 = User.find(id)
   assert u2.change_password('test', 'asdfg', 'asdfg')
   assert u2.valid?
   assert_not_equal(p, u2.crypted_password)
  end
  
  def test_change_password_fail 
   assert u = users(:first)
   assert p = u.crypted_password
   assert id = u.id
   assert u2 = User.find(id)
   assert !u2.change_password('tedst', 'asdfg', 'asdfg')
   assert u2.valid?
   assert_equal(p, u2.crypted_password)
  end
  
  def test_change_password_fail2
   assert u = users(:first)
   assert p = u.crypted_password
   assert id = u.id
   assert u2 = User.find(id)
   assert !u2.change_password('test', 'asdfg', 'asdfgd')
   assert u2.valid?
  end

  def test_password_and_confirm_password
   assert u = User.new
   assert u.password = '123456'
   assert u.password_confirmation = '123456'
   assert u.login = 'qwert'
   assert u.email = 'lsdfhoh@sldjf.com'
   assert u.valid?
  end

  def test_password_and_confirm_password_fail
   assert u = User.new
   assert u.password = '123456'
   assert u.password_confirmation = '12345'
   assert u.login = 'qwert'
   assert u.email = 'lsdfhoh@sldjf.com'
   assert !u.valid?
  end

  def test_password_and_confirm_password_fail2
   assert u = users(:first)
   assert !u.change_password('test', 'blah', 'd')
  end

  def test_should_create_user
   assert_difference "User.count" do
     user = create_user
     assert !user.new_record?, "#{user.errors.full_messages.to_sentence}"
     assert user.person
   end
  end

  def test_should_require_login
   assert_no_difference "User.count" do
     u = create_user(:login => nil)
     assert u.errors.on(:login)
   end
  end

  def test_should_require_password
   assert_no_difference "User.count" do
     u = create_user(:password => nil)
     assert u.errors.on(:password)
   end
  end

  def test_should_require_password_confirmation
   assert_no_difference "User.count" do
     u = create_user(:password_confirmation => nil)
     assert u.errors.on(:password_confirmation)
   end
  end

  def test_should_require_email
   assert_no_difference "User.count" do
     u = create_user(:email => nil)
     assert u.errors.on(:email)
   end
  end

  def test_should_reset_password
   users(:quentin).update_attributes(:password => 'new password',
                                     :password_confirmation => 'new password')
   assert_equal users(:quentin), User.authenticate('quentin', 'new password')
  end

  def test_should_not_rehash_password
   users(:quentin).update_attributes(:login => 'quentin2')
   assert_equal users(:quentin), User.authenticate('quentin2', 'test')
  end

  def test_should_authenticate_user
   assert_equal users(:quentin), User.authenticate('quentin', 'test')
  end

  def test_should_set_remember_token
   users(:quentin).remember_me
   assert_not_nil users(:quentin).remember_token
   assert_not_nil users(:quentin).remember_token_expires_at
  end
  

  def test_full_name
   assert u = users(:first)
   assert_equal "first last", u.full_name
   
   assert u2 = users(:second)
   assert_equal 'second', u2.full_name
     
   assert u3 = users(:quentin)
   assert_equal "quentin", u3.full_name
  end
  
  
  should "destroy and dependents" do
    u = users(:first)
    assert u.person
    u.destroy
    
    assert_nil u.person.reload
    assert_nil User.find_by_id(u.id)
  end
  
  
  
  
  should "create a new user and grab an existing person" do
    assert u = create_user( :email=>'13_invited@example.com')
    assert !u.new_record?
    assert_equal u, Person.find_by_email('13_invited@example.com').user
    assert_equal Person.find_by_email('13_invited@example.com'), u.reload.person
  end
  
  
  
  
protected
  def create_user(options = {})
    User.create({ :login => 'quire', :email => 'quire@example.com',
                :password => 'quire', :password_confirmation => 'quire' }.merge(options))
  end
end
