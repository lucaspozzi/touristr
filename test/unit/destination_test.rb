require 'test_helper'

class DestinationTest < ActiveSupport::TestCase

  should_have_one :country
  should_have_one :destination_content
  should_have_many :trip_items
  
  should "have parents and children" do
    france = create_destination_country
    paris = create_destination
    disney = create_destination_attraction
    assert_equal paris, disney.parent
    assert_equal france, paris.parent
    assert paris.in?(france.children)
    assert disney.in?(paris.children)
  end
  
end
