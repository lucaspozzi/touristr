require 'test_helper'

class TripTest < ActiveSupport::TestCase
  should_have_many :trip_memberships
  should_have_many :people
  should_have_many :trip_items
  should_validate_uniqueness_of :private_identifier
  
  
  should "have a private url after creations" do
    trip = Trip.create
    assert !trip.new_record?
    assert !trip.private_url.blank?
  end
  
  should "add a trippy in order" do
    trip = create_trip
    h1 = create_hotel
    h2 = create_hotel
    trip.add h1
    
    assert_equal 1, trip.trip_items.count
    assert_equal h1, trip.trippies.first
    assert_equal 0, trip.trip_items.first.ordered
    
    trip.add h2
    assert_equal 2, trip.trip_items.count
    assert_equal h2, trip.trippies.second
    assert_equal 1, trip.trip_items.second.ordered
    
  end
  
  
  should "move items to make space for a new one" do
    trip = create_trip
    t1 = trip.add create_todo
    t2 = trip.add create_todo
    t3 = trip.add create_todo
    t4 = trip.add create_todo
    
    assert_equal [0,1,2,3], [t1.ordered, t2.ordered, t3.ordered, t4.ordered]
    trip.send :move_trippies_back_one_starting_with, 2
    assert_equal [0,1,3,4], [t1.reload.ordered, t2.reload.ordered, t3.reload.ordered, t4.reload.ordered]
  end
  
  should "not add a country to the trip" do
    trip = create_trip
    assert_no_difference "trip.trip_items.count" do
      assert !trip.add( create_destination_country)
    end
  end
  
  should "add a destination city to the trip" do
    trip = create_trip
    paris = create_destination
    assert paris.city?
    assert !paris.country?
    assert !paris.attraction?
    assert_difference "trip.trip_items.count" do
      assert trip.add( paris)
    end
  end
  
  should "find the trippies parent" do
    trip = create_trip
    create_destination_country # so paris' parent.name will work
    t1 = trip.add create_destination
    assert_equal t1, trip.send( :trippies_parent, create_destination_attraction)
  end
  


  should "get the normal view" do
    trip = create_trip
    t1 = trip.add create_todo
    t2 = trip.add create_hotel
    t3 = trip.add create_todo
    t4 = trip.add create_todo
    
    nm = trip.trip_items_normal_view
    
    
  end
  
end
