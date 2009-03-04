class DestinationsController < ApplicationController
  
  
  def search
    @destinations = Destination.search(searchString)
  end
  
  
  
  
end
