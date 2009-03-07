# == Schema Information
#
# Table name: trip_items
#
#  id          :integer(4)    not null, primary key
#  trip_id     :integer(4)    
#  trippy_id   :integer(4)    
#  ordered     :integer(4)    
#  trippy_type :string(255)   
#  created_at  :datetime      
#  updated_at  :datetime      
#

class TripItem < ActiveRecord::Base
  belongs_to :trippy, :polymorphic=>true
  
  named_scope :sorted, {:order=>:ordered}
  
end
