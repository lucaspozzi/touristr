class Person < ActiveRecord::Base
  belongs_to :user
  
  
  
  validates_format_of :email, :with => /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i, :message=>'does not look like an email address.'
  validates_uniqueness_of :email, :case_sensitive => false
  
  
  def full_name
    return '' if self.first_name.nil? && self.last_name.nil?
    ((self.first_name || '') + ' ' + (self.last_name || '')).strip
  end
end
