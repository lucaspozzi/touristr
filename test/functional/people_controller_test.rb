require File.dirname(__FILE__) + '/../test_helper'

class PeopleControllerTest <  ActionController::TestCase




  should "get index" do
    get :index, {}, {:user=>users(:first).id}
    assert_response 302
    assert_redirected_to person_path(people(:first))
  end


  should "get show" do
    get :show, {:id=>people(:first).id}, {:user=>users(:first).id}
    assert_response 200
  end


  should "update name" do
    assert p = people(:first)
    assert p.first_name != 'x'
    assert p.last_name != 'y'
    assert p.email != 'a@b.com'
    put :update, {:id=>people(:first).id, :person=>{:first_name=>'x', :last_name=>'y', 'email'=>'a@b.com'}, :switch=>'name'}, {:user=>users(:first).id}
    assert_response 302
    assert p.reload
    assert p.first_name == 'x'
    assert p.last_name == 'y'
    assert p.email == 'a@b.com'
  end



  should "not update name (param fail)" do
    put :update, {:id=>people(:first).id, :person=>{:first_name=>'x', :last_name=>'y', 'email'=>'.com'}, :switch=>'name'}, {:user=>users(:first).id}
    assert_response 200
    assert_match "Email does not look like an email", @response.body
  end



  should "change password" do
    put :update, {:id=>people(:first).id, :verify_password=>'test', :new_password=>'qwert', :confirm_password=>'qwert', :switch=>'password'}, {:user=>users(:first).id}
    assert_response 302
  end



  should "not change password" do
    put :update, {:id=>people(:first).id, :verify_password=>'tst', :new_password=>'qwert', :confirm_password=>'qwert', :switch=>'password'}, {:user=>users(:first).id}
    assert_response 200
    assert_match "The password you supplied is not the correct password.", @response.body
  end



  should "not change password2" do
    put :update, {:id=>people(:first).id, :verify_password=>'test', :new_password=>'qweert', :confirm_password=>'qwert', :switch=>'password'}, {:user=>users(:first).id}
    assert_response 200
    assert_match "d The new password does not match the confirmation password", @response.body
  end





  should "not update wrong switch" do
    put :update, {:id=>people(:first).id, :switch=>'d'}, {:user=>users(:first).id}
    assert_response 200
    assert_equal "", @response.body
  end



  # 
  # 
  # should "upload avatar" do
  #   put :update, {:id=>people(:first).id, :icon=>fixture_file_upload('../../public/images/rails.png', 'image/png'), :switch=>'image'}, {:user=>users(:first).id}
  #   assert_response 302
  # end
  # 
  # 
  # 
  # 
  # 
  # should "delete avatar" do
  #   assert people(:first).icon.ends_with?('blah.jpg')
  #   assert_difference 'people(:first).icon', '' do
  #     delete :delete_icon, {:id=>people(:first).id}, {:user=>users(:first).id}
  #     assert_response 200
  #     assert_match 'new Effect.Puff("person_icon_picture",{});', @response.body
  #   end
  #   assert_equal '', people(:first).reload.attributes['icon']
  # end



  # 
  # should "update aim" do
  #   aim = people(:first).aim
  #   put :update, {:id=>people(:first).id, :person=>{:aim=>'blah'}, :switch=>'aim'}, {:user=>users(:first).id}
  #   assert_response 302
  #   assert_not_equal aim, people(:first).reload.aim
  #   assert_equal 'blah', people(:first).aim
  # end
  # 
  # 
  # 
  # should "update aim blank" do
  #   aim = people(:first).aim
  #   put :update, {:id=>people(:first).id, :person=>{:aim=>''}, :switch=>'aim'}, {:user=>users(:first).id}
  #   assert_response 302
  #   assert_not_equal aim, people(:first).reload.aim
  #   assert_equal '', people(:first).aim
  # end
  # 
  # 






  should "get edit" do
    get :edit, {:id=>people(:first).id}, {:user=>users(:first).id}
    assert_response 200
  end

  should "delete" do
    assert_difference 'User.count', -1 do
      assert users(:first)
      delete :destroy, {:id=>users(:first).id}, {:user, users(:first).id}
      assert_response 200
      assert_nil User.find_by_id(users(:first).id)
    end
  end

end
