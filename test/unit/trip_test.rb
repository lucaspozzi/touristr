require 'test_helper'

class TripTest < ActiveSupport::TestCase
  should_have_many :trip_memberships
  should_have_many :people
end
