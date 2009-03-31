require File.dirname(__FILE__) + '/../test_helper'

class PeopleControllerTest <  ActionController::TestCase


  context "a valid user" do
    setup do
      @user = create_user
    end

    should "get index" do
      get :index, {}, {:user=>@user}
      assert_response 302
      assert_redirected_to person_path(@user.person)
    end
  
  
    should "get show" do
      get :show, {:id=>@user.person.id}, {:user=>@user}
      assert_response 200
    end
  
  
    should "update name" do
      person = @user.person
      assert person.first_name != 'x'
      assert person.last_name != 'y'
      assert person.email != 'a@b.com'
      put :update, {:id=>@user.person.id, :person=>{:first_name=>'x', :last_name=>'y', 'email'=>'a@b.com'}, :switch=>'name'}, {:user=>@user}
      assert_response 302
      person = Person[person.id]
      assert person.first_name == 'x'
      assert person.last_name == 'y'
      assert person.email == 'a@b.com'
    end
  
  
  
    should "not update name (param fail)" do
      put :update, {:id=>@user.person.id, :person=>{:first_name=>'x', :last_name=>'y', 'email'=>'.com'}, :switch=>'name'}, {:user=>@user}
      assert_response 200
      assert_match "Email does not look like an email", @response.body
    end
  
  
  
    should "change password" do
      put :update, {:id=>@user.person.id, :verify_password=>'test', :new_password=>'qwert', :confirm_password=>'qwert', :switch=>'password'}, {:user=>@user}
      assert_response 302
    end
  
  
  
    should "not change password" do
      put :update, {:id=>@user.person.id, :verify_password=>'tst', :new_password=>'qwert', :confirm_password=>'qwert', :switch=>'password'}, {:user=>@user}
      assert_response 200
      assert_match "The password you supplied is not the correct password.", @response.body
    end
  
  
  
    should "not change password2" do
      put :update, {:id=>@user.person.id, :verify_password=>'test', :new_password=>'qweert', :confirm_password=>'qwert', :switch=>'password'}, {:user=>@user}
      assert_response 200
      assert_match "d The new password does not match the confirmation password", @response.body
    end
  
  
  
  
  
    should "not update wrong switch" do
      put :update, {:id=>@user.person.id, :switch=>'d'}, {:user=>@user}
      assert_response 200
      assert_equal "", @response.body
    end
  
  
  
    # 
    # 
    # should "upload avatar" do
    #   put :update, {:id=>@user.person.id, :icon=>fixture_file_upload('../../public/images/rails.png', 'image/png'), :switch=>'image'}, {:user=>@user}
    #   assert_response 302
    # end
    # 
    # 
    # 
    # 
    # 
    # should "delete avatar" do
    #   assert @user.person.icon.ends_with?('blah.jpg')
    #   assert_difference '@user.person.icon', '' do
    #     delete :delete_icon, {:id=>@user.person.id}, {:user=>@user}
    #     assert_response 200
    #     assert_match 'new Effect.Puff("person_icon_picture",{});', @response.body
    #   end
    #   assert_equal '', @user.person.reload.attributes['icon']
    # end
  
  
  
    # 
    # should "update aim" do
    #   aim = @user.person.aim
    #   put :update, {:id=>@user.person.id, :person=>{:aim=>'blah'}, :switch=>'aim'}, {:user=>@user}
    #   assert_response 302
    #   assert_not_equal aim, @user.person.reload.aim
    #   assert_equal 'blah', @user.person.aim
    # end
    # 
    # 
    # 
    # should "update aim blank" do
    #   aim = @user.person.aim
    #   put :update, {:id=>@user.person.id, :person=>{:aim=>''}, :switch=>'aim'}, {:user=>@user}
    #   assert_response 302
    #   assert_not_equal aim, @user.person.reload.aim
    #   assert_equal '', @user.person.aim
    # end
    # 
    # 
  
  
  
  
  
  
    should "get edit" do
      get :edit, {:id=>@user.person.id}, {:user=>@user}
      assert_response 200
    end
  
    should "delete" do
      assert_difference 'User.count', -1 do
        assert @user
        delete :destroy, {:id=>@user.person.id}, {:user, @user}
        assert_response 200
        assert_nil User.find_by_id(@user)
      end
    end

 end

end
