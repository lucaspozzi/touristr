require 'test_helper'

class DestinationTest < ActiveSupport::TestCase

  should_belong_to :country
  should_have_one :destination_content
  should_have_many :attractions

end
