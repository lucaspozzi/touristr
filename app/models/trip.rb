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
  extend ActiveSupport::Memoizable
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
    
  
  def trippies( class_name = nil)
    ar = []
    ti = class_name.blank? ? trip_items : trip_items.all(:conditions => {:trippy_type => class_name})
    ti.each { |ti| ar << ti.trippy }
    ar
  end
  
  
  
  
  
  def sort ids
    ids.each_with_index do |ti_id, index|
      trip_items.find(ti_id).update_attribute :ordered, index
    end
  end
  
  
  
  def trip_items_normal_view
    out = []
    trip_items.each do |ti|
      trippy = ti.trippy
      hash = out.last || {}
      next if trippy.city? && hash[:city_id] == trippy.id #this is a duplicate on the list, shouldn't really ever happen
      hash = {:city_id=>trippy.id, :city_name=>trippy.name, :dates=>[]} and out <<(hash) and next if trippy.city?
      if add_new_city_hash?(hash, trippy)
        hash = {:city_name=>trippy.city.if_method_nil(:name, ''), :dates=>[], :city_id=>trippy.city.if_method_nil(:id, nil)}
        out <<(hash)
      end
      hash[:dates] <<( {:date => ti.starts_at, :events=>[]}) if add_new_date_hash_to_this_date_hash?( hash[:dates].last, ti)
      hash[:dates].last[:events] << {:trippy=>trippy, :trip_item=>ti}
     end
    out
  end
  memoize :trip_items_normal_view
  
  
  def add_new_city_hash? current_hash, trippy
    return true if current_hash.empty?
    return false if trippy.city.nil?
    current_hash[:city_id] != trippy.city.if_method_nil(:id, nil)
  end
  
  def add_new_date_hash_to_this_date_hash? date_hash, trip_item
    return true if date_hash.nil?
    return true if date_hash.empty?
    return false if trip_item.starts_at.nil?
    date_hash[:date] != trip_item.starts_at
  end
    
   
=begin
  TODO these methods that act on the trip_items association should be refactored to the class
=end
  def add obj, starts_at = nil, ends_at = nil
    if obj.is_a?(Destination) 
      return nil if obj.country?
      if obj.city?
        return if trip_items.find_by_trippy_type_and_trippy_id obj.class.class_name, obj.id
      elsif obj.attraction?
=begin
  TODO adding an attraction after the city needs a test
=end
        ti_parent = trippies_parent obj
        move_trippies_back_one_starting_with ti_parent.ordered + 1
        order = ti_parent.ordered + 1
      end
    end
    order ||= (trip_items.first(:order=>'ordered desc').ordered + 1 rescue 0)
    trip_items.create :ordered=>order, :trippy=>obj, :starts_at => starts_at, :ends_at => ends_at
  end
    
    
  parent
  def trippies_parent t
    trip_items.select {|ti| ti.trippy_id == t.parent.id && ti.trippy_type == 'Destination'}.first
  end
  
  def move_trippies_back_one_starting_with num = 1
    trip_items.each do |ti|
      next unless ti.ordered >= num
      ti.update_attribute :ordered, ti.ordered + 1
    end
  end
  
end
