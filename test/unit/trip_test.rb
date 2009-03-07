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
  
end
