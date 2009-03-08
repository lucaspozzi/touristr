class TripItemsController < ApplicationController
  skip_before_filter :login_required
  
  def create
    trip_item = nil
    if params[:hotel_id]
      trip_item = @t.add Hotel[params[:hotel_id]]
    elsif params[:cars_id]
    elsif params[:destination_id]
      trip_item = @t.add Destination params[:destination_id]
    end
    
    respond_to do |wants|
      wants.js do
        render :update do |page|
          page.insert_html 'bottom', 'trip_bar', render( :partial=>"#{trip_item.trippy.class.class_name.underscore.pluralize}/list_item", :object=>trip_item.trippy, :locals=>{:dom_id=>trip_item.dom_id, :trip_item => trip_item})
        end
      end
    end
  end
  
  def destroy
    @trip_item = @t.trip_items.find params[:id]
    raise ActiveRecord::RecordNotFound unless @trip_item.in?(@p.trip_items)
    @trip_item.destroy
    respond_to do |wants|
      wants.js do
        render :update do |page|
          page.remove @trip_item.dom_id('in_trip_bar')
        end
      end
    end
  end
  
end
