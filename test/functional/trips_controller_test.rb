require 'test_helper'

class TripsControllerTest < ActionController::TestCase
  
  context "testing private/public security" do
    
    setup do
      @user1 = create_user
      @user2 = create_user
      @user2.person.current_trip.update_attribute :public, true
    end
    
    should "allow access to my private trip via the public url" do
      get :show, {:id=>@user1.person.current_trip.to_param}, {:user=>@user1}
      assert_response 200
    end    
    
    should "not allow access to someone else's private trip via the public url" do
      assert_raises ActiveRecord::RecordNotFound do
        get :show, {:id=>@user1.person.current_trip.to_param}, {:user=>@user2}
      end
    end
    
    should "allow access to my public trip via the public url" do
      get :show, {:id=>@user2.person.current_trip.to_param}, {:user=>@user2}
      assert_response 200
    end
        
    should "allow access to someone else's public trip via the public url" do
      get :show, {:id=>@user2.person.current_trip.to_param}, {:user=>@user1}
      assert_response 200
    end
    
    should "allow access to someone else's private trip via the private url and not show footer bar" do
      get :private, {:id=>@user1.person.current_trip.private_identifier}, {:user=>@user2}
      assert_response 200
      assert_no_tag 'div',  :attributes=>{:id=>"tripControl"}
    end

        
    should "allow access to my private trip via the private url and show footer bar" do
      get :private, {:id=>@user1.person.current_trip.private_identifier}, {:user=>@user1}
      assert_response 200
      assert_select '#tripControl', 1
    end

    
    
  end
end
