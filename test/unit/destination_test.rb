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

  should "remove duplicate names from search" do
    paris1 = create_destination
    paris2 = create_destination
    london = create_destination( :name => "London")
    
    Destination.stubs(:search).returns([paris1, paris2, london])

    res = Destination.s 'x'
    assert_equal 2, res.size
    assert_equal paris1, res[0]
    assert_equal london, res[1]
  end
end
