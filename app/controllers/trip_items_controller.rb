class TripItemsController < ApplicationController
  skip_before_filter :login_required
  
  def create
    if params[:hotel_id]
      @t.add Hotel[params[:hotel_id]]
    elsif params[:cars_id]
    end
  end
end
