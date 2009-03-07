require 'test_helper'

class TodoTest < ActiveSupport::TestCase
   should_have_many :trip_items
   should_validate_presence_of :title
end
