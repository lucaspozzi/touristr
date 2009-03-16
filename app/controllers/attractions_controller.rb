# used to have a hierachy in the URL: destinations/dest_id/attractions/attrac_id
# although both controllers handle destinations object

class AttractionsController < ApplicationController
  skip_before_filter :login_required
  before_filter :load_destination
  
  def show
    @attraction = Destination.find(params[:id])
  end
  
  def index
    redirect_to destination_path(@destination) unless @destination.city?
    @attractions = @destination.children
  end
  
  protected
  def load_destination
    @destination = Destination.find(params[:destination_id])
  end
end
