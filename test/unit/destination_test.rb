require 'test_helper'

class DestinationTest < ActiveSupport::TestCase

  should_have_one :country
  should_have_one :destination_content
  should_have_many :attractions
#  should_have_one :parent

end
