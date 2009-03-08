# == Schema Information
#
# Table name: hotels
#
#  id                :integer(4)    not null, primary key
#  wct_id            :integer(4)    
#  brand             :string(255)   
#  name              :string(255)   
#  address1          :string(255)   
#  address2          :string(255)   
#  city              :string(255)   
#  state             :string(255)   
#  country           :string(255)   
#  zip               :string(255)   
#  latitude          :string(255)   
#  longitude         :string(255)   
#  phone             :string(255)   
#  online_bookings   :string(1)     
#  hotrates          :string(1)     
#  video             :string(1)     
#  brochure          :string(1)     
#  overview          :string(1)     
#  reviews           :string(1)     
#  map               :string(1)     
#  price_band        :string(1)     
#  star_rating       :string(1)     
#  star_source       :string(1)     
#  amenities         :string(255)   
#  popularity_grade  :string(1)     
#  collections_grade :string(1)     
#  desc              :string(255)   
#  change_date       :datetime      
#  lo_rate           :string(255)   
#  hi_rate           :string(255)   
#  currency          :string(255)   
#  sabre_id          :string(255)   
#  long_desc         :text          
#  created_at        :datetime      
#  updated_at        :datetime      
#

class Hotel < ActiveRecord::Base
  has_many :trip_items, :as=>:trippy, :dependent=>:destroy
  
end
