# == Schema Information
#
# Table name: trip_memberships
#
#  id         :integer(4)    not null, primary key
#  person_id  :integer(4)    
#  trip_id    :integer(4)    
#  created_at :datetime      
#  updated_at :datetime      
#

class TripMembership < ActiveRecord::Base
  belongs_to :person
  belongs_to :trip
end
