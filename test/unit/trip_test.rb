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
  
  should "add a hotel after its destination" do
    trip = create_trip
    h1 = create_hotel_booking
    d1 = create_destination
    d2 = create_destination
    
    h1.stubs(:parent).returns(d1)
    
    trip.add d1
    assert_equal 1, trip.trip_items.count
    assert_equal d1, trip.trippies.first
    assert_equal 0, trip.trip_items.first.ordered
    
    trip.add d2
    assert_equal 2, trip.trip_items.count
    assert_equal d2, trip.trippies.second
    assert_equal 1, trip.trip_items.second.ordered
    
    trip.add h1
    assert_equal 3, trip.trip_items.count
    assert_equal h1, trip.trippies.third
    assert_equal 1, trip.trip_items.third.ordered
    
    assert_equal d2, trip.trippies.second
    assert_equal 2, trip.trip_items.second.ordered

  end

  should "return destination indexes" do
    trip = create_trip
    trip.add create_destination
    trip.add create_destination_attraction
    trip.add create_todo
    trip.add create_destination
    trip.add create_destination
    trip.add create_todo
    trip.add create_destination_attraction
    trip.add create_todo
    trip.add create_destination

    assert_equal 9, trip.trip_items.size
    assert_equal [0,3,4,8], trip.get_destination_indexes
    
  end

  should "add hotel in chronological order" do
    trip = create_trip
    d = create_destination
    h1 = create_hotel_booking
    h1.stubs(:parent).returns(d)
    h2 = create_hotel_booking
    h2.stubs(:parent).returns(d)
    
    trip.add d
    assert_equal 1, trip.trip_items.count
    assert_equal d, trip.trippies.first

    trip.add h1, "2009-09-09", "2009-09-13"
    assert_equal 2, trip.trip_items.count
    assert_equal h1, trip.trippies.second
    assert_equal 1, trip.trip_items.second.ordered
    
    trip.add h2, "2009-05-09", "2009-05-13"
    assert_equal 3, trip.trip_items.count
    assert_equal h2, trip.trippies.third
    assert_equal 1, trip.trip_items.third.ordered
    assert_equal 2, trip.trip_items.second.ordered
  end  

  should "add a trippy in order" do
    trip = create_trip
    d1 = create_destination
    t1 = create_todo
    t2 = create_todo
    d2 = create_destination

    trip.add d1
    assert_equal 1, trip.trip_items.count
    assert_equal d1, trip.trippies.first
    assert_equal 0, trip.trip_items.first.ordered
    
    trip.add t1
    assert_equal 2, trip.trip_items.count
    assert_equal t1, trip.trippies.second
    assert_equal 1, trip.trip_items.second.ordered
    
    trip.add t2
    assert_equal 3, trip.trip_items.count
    assert_equal t2, trip.trippies.third
    assert_equal 2, trip.trip_items.third.ordered
        
    trip.add d2
    assert_equal 4, trip.trip_items.count
    assert_equal d2, trip.trippies.fourth
    assert_equal 3, trip.trip_items.fourth.ordered
    
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
    d = create_destination
    t0 = trip.add d
    t1 = trip.add create_todo
    h = create_hotel_booking
    h.stubs(:parent).returns(d)
    t2 = trip.add h
    t3 = trip.add create_todo
    t4 = trip.add create_todo
=begin
  TODO need to write some tests for this method
=end
    #p trip.trip_items_normal_view
    
    
  end
  
end
