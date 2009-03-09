require 'test_helper'

class DestinationTest < ActiveSupport::TestCase

  should_have_one :country
  should_have_one :destination_content

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
