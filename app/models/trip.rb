# == Schema Information
#
# Table name: trips
#
#  id                 :integer(4)    not null, primary key
#  starts_on          :date          
#  ends_on            :date          
#  number_of_days     :integer(4)    default(0), not null
#  number_of_adults   :integer(4)    default(1), not null
#  number_of_children :integer(4)    default(0), not null
#  last_viewed        :boolean(1)    not null
#  public             :boolean(1)    default(true), not null
#  public_url         :string(255)   
#  private_url        :string(255)   
#  created_at         :datetime      
#  updated_at         :datetime      
#

class Trip < ActiveRecord::Base
  has_many :trip_memberships
  has_many :people, :through=>:trip_memberships
  
  named_scope :current, {:conditions=>{:last_viewed=>true}, :limit => 1}
end
