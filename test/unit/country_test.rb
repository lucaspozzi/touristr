require 'test_helper'

class CountryTest < ActiveSupport::TestCase
  
  should_have_many :destinations
  
end
