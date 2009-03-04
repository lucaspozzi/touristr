require 'test_helper'

class TripMembershipTest < ActiveSupport::TestCase
  should_belong_to :trip
  should_belong_to :person
end
