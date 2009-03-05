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
#  public             :boolean(1)    not null
#  private_url        :string(255)   
#  created_at         :datetime      
#  updated_at         :datetime      
#  name               :string(255)   
#

class Trip < ActiveRecord::Base
  has_many :trip_memberships
  has_many :people, :through=>:trip_memberships
  
  validates_uniqueness_of :private_url
  
  before_create :set_defaults
  
  
  
  
  
  def set_defaults
    self.private_url = UUID.random_create if private_url.blank?
  end
  
  def to_param
    "#{id}-#{name.downcase.gsub(' ', '-')}"
  end
    
    
end
