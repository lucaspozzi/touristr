module CarRental
  class SelectedCar < ActiveRecord::Base
    
    belongs_to :trip, :class_name => "Trip::Trip"
    
    def get_events
      events = Array.new
      events << Trip::Event::CarEvent.new(:date => self.pickup_date,
                                :time => nil,
                                :description => "Pickup #{self.make_model} at #{self.pickup_location_name}",
                                :destination_id => self.pickup_destination_id,
                                :leg_id => self.pickup_leg_id)
      events << Trip::Event::CarEvent.new(:date => self.return_date,
                                :time => nil,
                                :description => "Return #{self.make_model} at #{self.return_location_name}",
                                :destination_id => self.return_destination_id,
                                :leg_id => self.return_leg_id)
      return events
    end
    
  end
end
