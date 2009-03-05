# == Schema Information
#
# Table name: destinations
#
#  id                :integer(4)    not null, primary key
#  name              :string(255)   
#  ascii_name        :string(255)   
#  alternate_names   :string(255)   
#  lng               :decimal(15, 1 
#  lat               :decimal(15, 1 
#  feature_class     :string(1)     
#  feature_code      :string(10)    
#  region_name       :string(40)    
#  country_code      :string(2)     
#  cc2               :string(60)    
#  admin1_code       :string(20)    
#  admin2_code       :string(80)    
#  admin3_code       :string(20)    
#  admin4_code       :string(20)    
#  population        :integer(4)    
#  elevation         :integer(4)    
#  gtopo30           :integer(4)    
#  timezone          :string(255)   
#  modification_date :date          
#  created_at        :datetime      
#  updated_at        :datetime      
#  country_name      :string(255)   
#


class Destination < ActiveRecord::Base

  # friendly_param :name
  # track_hits

#  has_one :region_code
  belongs_to :country, :foreign_key=>:country_code
  has_one :destination_content
  has_many :attractions
#  has_many :trips, :through => "Trip::Leg"

  #set by the controller - needed to determine alternate_name
  attr_accessor :client_id 
  acts_as_commentable
  # 
  # GUIDES_DIR = "public/content/destination_guides"
  # 
  # def last_comments
  #   comments_ordered_by_submitted[0..4]
  # end
  # 
  def self.search(searchString)    
    # #      sql = <<-EOS
    # #          SELECT * FROM destinations
    # #          WHERE (name="#{searchString}" OR alternate_names LIKE "%#{searchString}%")
    # #          ORDER BY population DESC, name, country_name LIMIT 100
    # #      EOS
    # #      @destinations = find_by_sql(sql)
    # #      if @destinations.size == 0 then        
    # @destinations = make_destinations_from_xml(Gateway.search_geonames(searchString))
    # #      end
    # return @destinations
    %w(a b c d e)
  end
  # 
  # def alternate_name
  #   logger.debug "HERE ************"
  #   client_destination = ClientDestination.find_by_client_id_and_destination_id(@client_id, self.id)
  #   if !client_destination.nil? && !client_destination.alternate_name.nil? then 
  #     return client_destination.alternate_name
  #   else        
  #     return self.name
  #   end
  # end
  # 
  # def find_nearby_airports(within_mile_radius)
  #   logger.debug("xxxxxxxxxxxxxx LAT: #{self.lat}")
  #   logger.debug("xxxxxxxxxxxxxx LNG: #{self.lng}")
  #   Flight::Airport.find(:all, :origin =>[self.lat,self.lng], :within=>within_mile_radius, :order => :distance)
  # end
  # 
  # def self.top_ten
  #   return find_by_sql("select destinations.id, name, region_name, country_name, (select count(id) from destination_attractions where destination_attractions.destination_id = destinations.id) as at_count from destinations order by at_count desc limit 10")
  # end
  # 
  # 
  # def self.top_searched(client_id ,limit)  
  #   sql =
  #   <<-EOS
  #   SELECT STRAIGHT_JOIN destinations.id, COALESCE(client_destinations.alternate_name, destinations.ascii_name) as name,
  #   destinations.region_name, destinations.country_name
  #   FROM destinations 
  #   INNER JOIN client_destinations ON destinations.id = client_destinations.destination_id
  #   WHERE client_destinations.client_id=#{client_id} 
  #   ORDER BY view_count
  #   LIMIT #{limit}
  #   EOS
  #   find_by_sql(sql) 
  # end
  # 
  # def self.cache_has_expired(client_id)
  #   expired = true
  #   if (!@@destination_cache_load_time[client_id].nil?)
  #     cache_lifetime = Time.now - @@destination_cache_load_time[client_id]          
  #     if cache_lifetime.to_i < @@CACHE_EXPIRATION then
  #       expired = false
  #     end
  #   end
  #   return expired      
  # end
  # 
  # @weather_loaded = false
  # def weather
  #   if !@weather_loaded then
  #     @weather = Weather::WeatherInfo.new(self.name)
  #     @weather_loaded = true
  #   end
  #   return @weather       
  # end
  # 
  # @pictures_loaded = false
  # def pictures
  #   if !@pictures_loaded
  #     rad ||= 5
  #     @pano_pictures = Gateway.get_panoramio_pics(self.lat, self.lng, rad)
  #     @pictures_loaded = true
  #   end
  #   return @pano_pictures
  # end
  # 
  # @reviews_loaded = false
  # def reviews
  #   if !@reviews_loaded
  #     rad ||= 5
  #     @tr_reviews = Gateway::get_tr_reviews(self.lat, self.lng, rad)
  #     @reviews_loaded = true
  #   end
  #   return @tr_reviews
  # end
  # 
  # def self.get_story(id)
  #   return Gateway::get_tr_review(id)
  # end
  # 
  # def get_nearby_attractions
  #   return Destination::Attraction.get_nearby_attractions(self.lat, self.long)
  # end
  # 
  # private
  # 
  # def self.make_destinations_from_xml(doc)
  #   xml_geonames = doc.get_elements('geonames/geoname')
  #   destinations = Array.new
  #   xml_geonames.each { |xml_geoname|
  #     destinations << self.make_destination_from_xml(xml_geoname)
  #   }     
  #   logger.debug(destinations.inspect)
  #   return destinations  
  # end
  # 
  # def self.make_destination_from_xml(xml_geoname)
  #   #seems to be nil sometimes
  #   timezone = xml_geoname.elements['timezone'].text unless xml_geoname.elements['timezone'].nil?
  #   d = Destination.new(
  #   :id => xml_geoname.elements['geonameId'].text,
  #   :name => xml_geoname.elements['name'].text,
  #   :ascii_name => xml_geoname.elements['name'].text,
  #   :alternate_names => xml_geoname.elements['alternateNames'].text,        
  #   :lat => xml_geoname.elements['lat'].text,
  #   :lng => xml_geoname.elements['lng'].text,
  #   :feature_class => xml_geoname.elements['fcl'].text,
  #   :feature_code => xml_geoname.elements['fcode'].text,
  #   :region_name => xml_geoname.elements['adminName1'].text,        
  #   :country_code => xml_geoname.elements['countryCode'].text,
  #   :country_name => xml_geoname.elements['countryName'].text,        
  #   :admin1_code => xml_geoname.elements['adminCode1'].text,
  #   :admin2_code => xml_geoname.elements['adminCode2'].text,
  #   :population => xml_geoname.elements['population'].text,
  #   :elevation => xml_geoname.elements['elevation'].text,
  #   :timezone => timezone)     
  #   d.id = xml_geoname.elements['geonameId'].text
  #   return d      
  # end

end

