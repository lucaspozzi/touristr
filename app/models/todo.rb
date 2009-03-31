# == Schema Information
#
# Table name: todos
#
#  id          :integer(4)    not null, primary key
#  person_id   :integer(4)    
#  title       :string(255)   
#  description :text          
#  created_at  :datetime      
#  updated_at  :datetime      
#  done        :boolean(1)    not null
#

class Todo < ActiveRecord::Base
  include Trippy
  belongs_to :person
  has_one :trip_item, :as=>:trippy, :dependent=>:destroy
  
  validates_presence_of :title
  
  
  
  
  
end
