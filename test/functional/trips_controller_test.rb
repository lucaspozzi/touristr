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
  
  context "testing action security to make sure only a member can do stuff" do
    setup do
      @user1 = create_user
      @user2 = create_user
      @user2.person.current_trip.update_attribute :public, true
    end
    
    should "see the edit form if it's my trip" do
      get :edit, {:id=>@user1.person.current_trip_id}, {:user=>@user1}
      assert_response 200
    end
    
    should "not see the edit form if it's not my trip" do
      assert_raises ActiveRecord::RecordNotFound do
        get :edit, {:id=>@user1.person.current_trip_id}, {:user=>@user2}
      end
    end    
    should "update if it's my trip" do
      put :update, {:id=>@user1.person.current_trip_id, :trip=>{:name=>'blah'}}, {:user=>@user1}
      assert_response 200
    end
    
    should "not update if it's not my trip" do
      assert_raises ActiveRecord::RecordNotFound do
        put :update, {:id=>@user1.person.current_trip_id}, {:user=>@user2}
      end
    end
  end
  
  context "testing action security to make sure only a member can sort" do
    setup do
      @user1 = create_user
      @user2 = create_user
      @user2.person.current_trip.update_attribute :public, true
      ti1 = @user1.person.current_trip.add create_todo
      ti2 = @user1.person.current_trip.add create_todo
      @params = {:id=>@user1.person.current_trip_id, :tripList=>[ti1.id.to_s, ti2.id.to_s]}
    end
  
    should "sort if it's my trip" do
      post :sort, @params, {:user=>@user1}
      assert_response 200
    end
    
    should "not sort if it's not my trip" do
      assert_raises ActiveRecord::RecordNotFound do
        post :sort, @params, {:user=>@user2}
      end
    end
  end
  
    
  context "sorting" do
    setup do
      @user = create_user
      @trip = @user.person.current_trip
      @ti1 = @trip.add create_todo
      @ti2 = @trip.add create_todo
      @ti3 = @trip.add create_todo
      @ti4 = @trip.add create_todo
    end
    
    should "sort" do
      assert_equal [@ti1.id, @ti2.id, @ti3.id, @ti4.id], @trip.trip_item_ids
      post :sort, {:id=>@trip.id, :tripList=>[@ti4.id.to_s, @ti3.id.to_s, @ti2.id.to_s, @ti1.id.to_s]}, {:user=>@user}
      assert_equal [@ti4.id, @ti3.id, @ti2.id, @ti1.id], @trip.trip_item_ids
    end
  end
  
  
end
