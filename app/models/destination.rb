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
#


class Destination < ActiveRecord::Base
  
  COUNTRY = "PCLI"
  ADMIN_LEVEL1 = "ADM1"
  ADMIN_LEVEL2 = "ADM2"
  MAX_DESTINATION_SEARCH = 15
  CITY = "PPL"
  
  # friendly_param :name
  # track_hits
  include REXML

#  has_one :region_code
  has_one :country, :foreign_key => :iso, :primary_key => :country_code
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
  
  def city?
    return feature_code == CITY
  end
  
  def parent
    case feature_code
    when ADMIN_LEVEL1: return Destination.find(:first, :conditions => "country_code='#{country_code}' and feature_code='#{COUNTRY}'")
    when ADMIN_LEVEL2: return Destination.find(:first, :conditions => "country_code='#{country_code}' and admin1_code='#{admin1_code}' and feature_code='#{ADMIN_LEVEL1}'")
    else
      # a city may be directly under ADM1 (e.g. galway) 
      p = Destination.find(:first, :conditions => "country_code='#{country_code}' and admin1_code='#{admin1_code}' and admin2_code='#{admin2_code}' and feature_code='#{ADMIN_LEVEL2}'")
      return p unless p.nil?
      Destination.find(:first, :conditions => "country_code='#{country_code}' and admin1_code='#{admin1_code}' and admin2_code='#{admin2_code}' and feature_code='#{ADMIN_LEVEL1}'")
    end
  end
  
  def children(max)
    case feature_code
    when COUNTRY: return Destination.find(:all, :limit => max, :conditions => "country_code='#{country_code}' and feature_class='P'", :order => "population DESC")
    when ADMIN_LEVEL1: return Destination.find(:all, :limit => max, :conditions => "country_code='#{country_code}' and admin1_code='#{admin1_code}' and feature_class='P'", :order => "population DESC")
    when ADMIN_LEVEL2: return Destination.find(:all, :limit => max, :conditions => "country_code='#{country_code}'  and admin1_code='#{admin1_code}' and admin2_code='#{admin2_code}' and feature_class='P'", :order => "population DESC")
    else RAILS_DEFAULT_LOGGER.error("Something else... #{feature_code}")
    end
  end
  
  def self.search(searchString)    
    @destinations = make_destinations_from_xml(search_geonames(searchString))
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

   def self.get_destinations_from_geonames(search)
     return make_destinations_from_xml(search_geonames(search))
   end

   def self.search_geonames(search)  
     begin      
       url_string = "/search?name=#{URI.escape(search)}&maxRows=#{MAX_DESTINATION_SEARCH}&feature_code='P'&style=FULL"
       Net::HTTP.start('ws.geonames.org', 80) do |http|
         resp = http.get(url_string, 'Accept' => 'text/xml')
         puts(resp.body)
         return (resp.body)    
       end     
     rescue StandardError => e
       RAILS_DEFAULT_LOGGER.error "Failed to get back results from geoname: #{e.message}"
       return ""
     end          
   end

   def self.make_destinations_from_xml(doc)
     h = Hpricot(doc)
     xml_dest = h.at("//geonames")
     dests = xml_dest.search("//geoname")
     destinations = Array.new
     dests.each do |dest|
       destinations << make_destination_from_xml(dest)
     end
     destinations
   end

   def self.make_destination_from_xml(hp_xml_geoname)
     #seems to be nil sometimes
     timezone = hp_xml_geoname.at("//timezone").inner_html.to_s unless hp_xml_geoname.at("//timezone").nil?     
     
     d = Destination.new(
     :id => (hp_xml_geoname.at("geonameid").inner_html.to_s),
     :name => (hp_xml_geoname.at("name").inner_html.to_s),
     :ascii_name => (hp_xml_geoname.at("name").inner_html.to_s),
     :alternate_names => (hp_xml_geoname.at("alternatenames").inner_html.to_s),      
     :lat => hp_xml_geoname.at("lat").inner_html.to_s,
     :lng => hp_xml_geoname.at("lng").inner_html.to_s,
     :feature_class => hp_xml_geoname.at("fcl").inner_html.to_s,
     :feature_code => hp_xml_geoname.at("fcode").inner_html.to_s,
     :region_name => hp_xml_geoname.at("adminname1").inner_html.to_s,        
     :country_code => hp_xml_geoname.at("countrycode").inner_html.to_s,
     :admin1_code => hp_xml_geoname.at("admincode1").inner_html.to_s,
     :admin2_code => hp_xml_geoname.at("admincode2").inner_html.to_s,
     :population => hp_xml_geoname.at("population").inner_html.to_s,
     :elevation => hp_xml_geoname.at("elevation").inner_html.to_s,
     :timezone => timezone.to_s)     
     d.id = hp_xml_geoname.at("geonameid").inner_html
     return d      
   end

  # def self.search_geonames(search)  
  #   begin      
  #     url_string = "/search?name=#{URI.escape(search)}&maxRows=#{MAX_DESTINATION_SEARCH.to_s}&featureClass=P&style=FULL"
  #     RAILS_DEFAULT_LOGGER.debug url_string
  #     Net::HTTP.start('ws.geonames.org', 80) do |http|
  #       resp = http.get(url_string, 'Accept' => 'text/xml')
  #       RAILS_DEFAULT_LOGGER.debug "response from geonames: #{resp.code.to_s}"
  #       RAILS_DEFAULT_LOGGER.debug "response from geonames: #{resp.body.to_s}"        
  #       return Document.new(resp.body)    
  #     end     
  #   rescue StandardError
  #     RAILS_DEFAULT_LOGGER.error "Failed to get back results from geoname"
  #     return Document.new
  #   end          
  # end 

end

