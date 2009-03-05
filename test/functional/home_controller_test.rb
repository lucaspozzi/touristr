require 'test_helper'

class HomeControllerTest < ActionController::TestCase
  
  # should "create a new person and show a link to their trip" do
  #   Person.destroy_all
  #   get :index
  #   person = assigns['p']
  #   assert !person.new_record?
  #   assert person.current_trip
  #   assert_match "My Trip</a>" , @response.body
  #   assert_equal person.id, @response.cookies['_touristr_person'].value.first.to_i
  # end


  should "show a link to their trip when logged in" do
    user = create_user
    get :index, {}, {:user=>user.id}
    person = assigns['p']
    assert !person.new_record?
    assert person.current_trip
    assert_equal user.person, person
    assert_match "My Trip</a>" , @response.body
    assert_nil@response.cookies['_touristr_person']
  end


end
