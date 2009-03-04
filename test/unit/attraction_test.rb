require 'test_helper'

class AttractionTest < ActiveSupport::TestCase
  
  should_belong_to :destination
  should_belong_to :author
  
end
