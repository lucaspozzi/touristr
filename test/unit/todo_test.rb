require 'test_helper'

class TodoTest < ActiveSupport::TestCase
   should_have_one :trip_item, :dependent=>:destroy
   should_validate_presence_of :title

   
end
