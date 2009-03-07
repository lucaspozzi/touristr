require 'test_helper'

class HotelTest < ActiveSupport::TestCase
  should_have_many :trip_items
end
