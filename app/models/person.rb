# == Schema Information
#
# Table name: people
#
#  id              :integer(4)    not null, primary key
#  user_id         :integer(4)    
#  first_name      :string(255)   
#  last_name       :string(255)   
#  icon            :string(255)   
#  email           :string(255)   
#  created_at      :datetime      
#  updated_at      :datetime      
#  current_trip_id :integer(4)    
#

class Person < ActiveRecord::Base
  belongs_to :user
  has_many :trip_memberships, :dependent=>:destroy
  has_many :trips, :through=>:trip_memberships
  has_many :trip_items, :through=>:trips
  belongs_to :current_trip, :class_name => "Trip", :foreign_key => "current_trip_id"
  has_many :todos
  
  
  
  validates_format_of :email, :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i, :message=>'does not look like an email address.', :unless => Proc.new{|p| p.user_id.blank? || !p.invited}
  validates_uniqueness_of :email, :case_sensitive => false, :unless=>Proc.new{|p| p.email.blank?}
  
  after_create :setup_trip
  after_destroy :cleanup
  
  
  def setup_trip
    update_attribute :current_trip_id, trips.create( :name=>'My Trip').id
  end
  
  def full_name
    return '' if self.first_name.nil? && self.last_name.nil?
    ((self.first_name || '') + ' ' + (self.last_name || '')).strip
  end
  alias_method :f, :full_name
  
  def set_current_trip t
    return true if t.nil? || !t.in?(trips)
    update_attribute :current_trip, t
  end
  
  def cleanup
    trips.each do |trip|
      trip.destroy if trip.memberships.count == 1
    end
  end
  
  
  def create_and_add_to_trip params, trip, message = ''
    raise 'Action not allowed' unless trip.in?(trips)
    person = Person.new params
    return person unless person.valid?
    begin
      AccountMailer.deliver_invite person, trip, self, message
    rescue StandardError, *SMTP_ERRORS => e
      logger.debug e.inspect.red
      person.errors.add :email, "we couldn't send to that email address."
      return person
    end
    person.save
    trip.people << person
    trip.update_attribute :number_of_adults, trip.number_of_adults += 1
    person
    
  end
  
end
