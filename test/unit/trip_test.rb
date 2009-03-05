require 'test_helper'

class TripTest < ActiveSupport::TestCase
  should_have_many :trip_memberships
  should_have_many :people
  should_validate_uniqueness_of :private_url
  
  
  should "have a private url after creations" do
    trip = Trip.create
    assert !trip.new_record?
    assert !trip.private_url.blank?
  end
end
