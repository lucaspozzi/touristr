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
  set_primary_key :ezrez_id
  include Trippy
  has_many :trip_items, :as=>:trippy, :dependent=>:destroy
  has_many :hotel_pictures, :foreign_key => "hotel_code"
  acts_as_mappable :lat_column_name => :latitude,
                   :lng_column_name => :longitude
  
  def city
    Destination.first.city
  end
  
  def parent
    begin
      res = open("http://ws.geonames.org/findNearby?lat=#{self.latitude}&lng=#{self.longitude}&featureCode=PPLA&featureCode=PPLC&featureCode=PPL").read
      RAILS_DEFAULT_LOGGER.debug("Hotel#parent - result: #{res}")
      id = /.*<geonameId>([0-9]+)<\/geonameId>.*/.match(res)[1]
      Destination.find(id.to_i)
    rescue Exception => e
      RAILS_DEFAULT_LOGGER.error("Hotel#parent: for hotel #{self.ezrez_id}: #{e.message}")
    end
  end
  
  def main_picture
    main = self.hotel_pictures.find_by_image_code("GEN", :limit => 1)
    return "http://cdn.ezrez.com/www.hotelbeds.com/giata/#{main.image_path}" unless main.nil?
    nil
  end
end
