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
#  private_identifier :string(255)   
#  created_at         :datetime      
#  updated_at         :datetime      
#  name               :string(255)   
#

class Trip < ActiveRecord::Base
  has_many :trip_memberships
  has_many :people, :through=>:trip_memberships
  has_many :trip_items, :order=>:ordered
  
  validates_uniqueness_of :private_identifier
  
  before_create :set_defaults
  
  
  
  
  
  def set_defaults
    self.private_identifier = UUID.random_create.to_s if private_identifier.blank?
  end
  
  def to_param
    "#{id}-#{name.downcase.gsub(' ', '-')}"
  end
  
  def private_url
    if Rails.env.production?
      "http://touristr.com/trips/private/#{private_identifier}"
    else
      "http://localhost:3000/trips/private/#{private_identifier}"
    end
  end
    
  
  def trippies
    ar = []
    trip_items.sorted.each { |ti| ar << ti.trippy }
    ar
  end
  
    
    
  def add obj
    order = trip_items.first(:order=>'ordered desc').ordered + 1 rescue 0
    trip_items.create :ordered=>order, :trippy=>obj
  end
    
end
