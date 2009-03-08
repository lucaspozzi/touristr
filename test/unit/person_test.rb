require File.dirname(__FILE__) + '/../test_helper'

class PersonTest < Test::Unit::TestCase

  should_belong_to :user
  should_belong_to :current_trip
  should_have_many :trip_memberships
  should_have_many :trips
  should_have_many :trip_items
  should_have_many :todos



  context "creating new with trip" do
    setup do
      @user = create_user
      @trip = @user.person.current_trip
    end
    
    should "invite and add" do
      assert_difference "@trip.number_of_adults" do
      assert_difference "@trip.trip_memberships.count" do
      assert_difference "Person.count" do
        person = @user.person.create_and_add_to_trip( {:email=>'jan@touristr.com'}, @trip)
      end
      end
      end
    end
    
    should "not invite and add" do
      assert_no_difference "@trip.number_of_adults" do
      assert_no_difference "@trip.trip_memberships.count" do
      assert_no_difference "Person.count" do
        person = @user.person.create_and_add_to_trip( {:email=>'jan@touristr.c'}, @trip)
      end
      end
      end
    end
    
    should "not invite if email can't be sent" do
      AccountMailer.expects(:deliver_invite).raises(StandardError)
      assert_no_difference "@trip.number_of_adults" do
      assert_no_difference "@trip.trip_memberships.count" do
      assert_no_difference "Person.count" do
        person = @user.person.create_and_add_to_trip( {:email=>'jan@touristr.com'}, @trip)
      end
      end
      end
    end
  end




  should "have a current trip" do
    person = create_person
    assert(person.current_trip)
  end
  
  should "create a new user from find" do
    email = 'new_address@blah.com'
    assert_nil Person.find_by_email(email)
    assert p = Person.find_or_create_by_email(email)
    assert !p.new_record?
    assert_equal email, p.reload.email
  end


  should "return an existing user from find" do
    email = people(:first).email
    assert Person.find_by_email(email)
    assert p = Person.find_or_create_by_email(email)
    assert !p.new_record?
    assert_equal people(:first), p.reload
  end



  # a person should never be destroyed, so this should never be called, but
  # we do have an after_destroy hook, just incase the business rules change we don't have
  # to rember to do that.
  # So this test is really just for code coverage.
  should "destroy person" do
    assert_difference 'Person.count', -1 do
      people(:first).destroy
    end
  end
  
  
  # 
  # 
  # should "match aim & aim_address" do
  #   assert_equal people(:first).aim, people(:first).aim_address.gsub('@aim.messaging.lesseverything.com', '')
  #   assert_equal "#{people(:first).aim}@aim.messaging.lesseverything.com", people(:first).aim_address
  # end
  # 
  # 
  # should "reset aim registration without changing aim" do
  #   p = people(:first)
  #   aim = p.aim
  #   auth_code = p.aim_auth_code
  #   assert p.aim_authenticated
  #   assert p.reset_aim( p.aim)
  #   p.reload
  #   assert_equal p.aim, aim
  #   assert_not_equal auth_code, p.aim_auth_code
  #   assert !p.aim_authenticated
  # end
  # 
  # 
  # should "reset aim registration wile changing aim" do
  #   p = people(:first)
  #   aim = p.aim
  #   auth_code = p.aim_auth_code
  #   assert p.aim_authenticated
  #   assert p.reset_aim( 'blah')
  #   p.reload
  #   assert_equal p.aim, 'blah'
  #   assert_not_equal p.aim, aim
  #   assert_equal 'blah@aim.messaging.lesseverything.com', p.aim_address
  #   assert_not_equal auth_code, p.aim_auth_code
  #   assert !p.aim_authenticated
  # end
  # 
  # should "regen aim auth code" do
  #   p = people(:first)
  #   aim = p.aim
  #   auth_code = p.aim_auth_code
  #   assert p.aim_authenticated
  #   assert p.regen_im_auth_codes
  #   p.reload
  #   assert_equal p.aim, aim
  #   assert_not_equal auth_code, p.aim_auth_code
  #   assert p.aim_authenticated
  # end
  # 
  # 
  # 
  # should "not regen aim auth code (cuz aim is blank)" do
  #   p = people(:owner)
  #   aim = p.aim
  #   auth_code = p.aim_auth_code
  #   assert !p.aim_authenticated
  #   p.regen_im_auth_codes
  #   p.reload
  #   assert_equal p.aim, aim
  #   assert_equal auth_code, p.aim_auth_code
  #   assert_nil p.aim_auth_code
  #   assert !p.aim_authenticated
  # end
  # 
  # 
  # should "register aim" do
  #   p = people(:second)
  #   aim = p.aim_address
  #   auth_code = p.aim_auth_code
  #   assert !p.aim_authenticated
  #   assert Person.register( aim, auth_code)
  #   p.reload
  #   assert_equal p.aim_address, aim
  #   assert_equal auth_code, p.aim_auth_code
  #   assert p.aim_authenticated
  # end
  # 
  # 
  # should "not register aim (can't find address)" do
  #   p = people(:second)
  #   aim = p.aim_address + 'xxx'
  #   auth_code = p.aim_auth_code
  #   assert !p.aim_authenticated
  #   assert !Person.register( aim, auth_code)
  #   p.reload
  #   assert_not_equal p.aim_address, aim
  #   assert_equal auth_code, p.aim_auth_code
  #   assert !p.aim_authenticated
  # end
  # 
  # 
  # should "not register aim (can't find authcode)" do
  #   p = people(:second)
  #   aim = p.aim_address
  #   auth_code = p.aim_auth_code + 'xxx'
  #   assert !p.aim_authenticated
  #   assert !Person.register( aim, auth_code)
  #   p.reload
  #   assert_equal p.aim_address, aim
  #   assert_not_equal auth_code, p.aim_auth_code
  #   assert !p.aim_authenticated
  # end

end