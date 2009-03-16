# used to have a hierachy in the URL: destinations/dest_id/attractions/attrac_id
# although both controllers handle destinations object

class AttractionsController < ApplicationController
  skip_before_filter :login_required
  before_filter :load_destination
  
  def show
    puts("destination = #{@destination.name}  -- attraction = #{@attraction.name}")
  end
  
  def index
    
  end
  
  protected
  def load_destination
    @attraction = Destination.find(params[:id])
    @destination = @attraction.parent
  end
end
