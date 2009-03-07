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
#  time_zone         :string(255)   
#  modification_date :date          
#  created_at        :datetime      
#  updated_at        :datetime      
#  country_name      :string(255)   
#  click_counter     :integer(4)    default(0), not null
#  score             :integer(4)    default(0), not null
#  delta             :boolean(1)    not null
#


class Destination < ActiveRecord::Base
#  include REXML
  
  
  has_one :country, :foreign_key => :iso, :primary_key => :country_code
  has_one :destination_content
  has_many :attractions

  acts_as_commentable


  COUNTRY = "PCLI"
  ADMIN_LEVEL1 = "ADM1"
  ADMIN_LEVEL2 = "ADM2"
  MAX_DESTINATION_SEARCH = 15
  CITY_PREFIX = "PP"


  define_index do
    indexes name, feature_class, feature_code, region_name, country_code, admin1_code, admin2_code
    has score, :sortable=>true, :type=>:integer
    set_property :delta=>true
  end
  
  
  before_save :set_score

  
  def city?
    feature_code.start_with?(CITY_PREFIX)
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
    else logger.error("Something else... #{feature_code}")
    end
  end
  
  def self.s query, params = {}
    self.search query, params.merge({:order=>'score desc'})
  end
  
  def increment_click_counter
    self.click_counter +=1
    save
  end
  
  
  
#  update destinations set `score` = (((LENGTH(alternate_names) + 1) * 7) * (CASE feature_class WHEN 'P' THEN 2 ELSE 1 END) *  (CASE feature_class WHEN 'H' THEN 1 WHEN 'R' THEN 1 WHEN 'T' THEN 1 WHEN 'U' THEN 1 ELSE 5 END) * (CASE feature_code WHEN 'P' THEN 5 WHEN 'P' THEN 5 WHEN 'L' THEN 5 WHEN 'A' THEN 5  WHEN 'A' THEN 5 WHEN 'M' THEN 5 WHEN 'U' THEN 5 WHEN 'S' THEN 5  WHEN 'P' THEN 5 WHEN 'R' THEN 5 WHEN 'K' THEN 5  WHEN 'A' THEN 5 WHEN 'N' THEN 5 WHEN 'S' THEN 5  WHEN 'A' THEN 5 WHEN 'R' THEN 5 WHEN 'C' THEN 5 WHEN 'H' THEN 5  WHEN 'A' THEN 5 WHEN 'S' THEN 5 WHEN 'T' THEN 5 WHEN 'R' THEN 5  WHEN 'C' THEN 5 WHEN 'H' THEN 5  WHEN 'B' THEN 5 WHEN 'D' THEN 5 WHEN 'G' THEN 5  WHEN 'C' THEN 5 WHEN 'S' THEN 5 WHEN 'T' THEN 5 WHEN 'L' THEN 5  WHEN 'C' THEN 5 WHEN 'T' THEN 5 WHEN 'R' THEN 5 WHEN 'S' THEN 5  WHEN 'G' THEN 5 WHEN 'D' THEN 5 WHEN 'N' THEN 5  WHEN 'H' THEN 5 WHEN 'S' THEN 5 WHEN 'T' THEN 5 WHEN 'S' THEN 5  WHEN 'M' THEN 5 WHEN 'U' THEN 5 WHEN 'S' THEN 5  WHEN 'O' THEN 5 WHEN 'B' THEN 5 WHEN 'S' THEN 5  WHEN 'P' THEN 5 WHEN 'Y' THEN 5 WHEN 'R' THEN 5  WHEN 'P' THEN 5 WHEN 'R' THEN 5 WHEN 'Y' THEN 5 WHEN 'S' THEN 5  WHEN 'R' THEN 5 WHEN 'L' THEN 5 WHEN 'G' THEN 5  WHEN 'R' THEN 5 WHEN 'S' THEN 5 WHEN 'R' THEN 5 WHEN 'T' THEN 5  WHEN 'S' THEN 5 WHEN 'H' THEN 5 WHEN 'R' THEN 5 WHEN 'N' THEN 5  WHEN 'S' THEN 5 WHEN 'Q' THEN 5 WHEN 'R' THEN 5  WHEN 'T' THEN 5 WHEN 'O' THEN 5 WHEN 'W' THEN 5 WHEN 'R' THEN 5  WHEN 'Z' THEN 5 WHEN 'O' THEN 5 WHEN 'O' THEN 5 ELSE 1 END) * (click_counter + 1) + (population / 5))
  
  def set_score
    self.score = (((alternate_names.size + 1) * 7) *
    (feature_class == 'P' ? 2 : 1) *
    (feature_class.in?(%w(H R T U)) ? 1 : 5) *
    (feature_code.in?(%w(PPLA AMUS PRK ANS ARCH ASTR CH BDG CSTL CTRS GDN HSTS MUS OBS PYR PRYS RLG RSRT SHRN SQR TOWR ZOO)) ? 5 : 1) *
    (click_counter + 1)) +
    (population / 5)
  end
  
  # 
  #   def self.search(searchString)    
  #     @destinations = make_destinations_from_xml(search_geonames(searchString))
  #   end
  # 
  #    def self.get_destinations_from_geonames(search)
  #      return make_destinations_from_xml(search_geonames(search))
  #    end
  # 
  # =begin
  #   TODO change the search to:
  #   1. remove the maxrows so 
  #   2. we can do sorting and filtering
  # =end
  #    def self.search_geonames(search)  
  #      begin      
  #        url_string = "/search?name=#{URI.escape(search)}&maxRows=#{MAX_DESTINATION_SEARCH}&feature_code='P'&style=FULL"
  #        Net::HTTP.start('ws.geonames.org', 80) do |http|
  #          resp = http.get(url_string, 'Accept' => 'text/xml')
  #          puts(resp.body)
  #          return (resp.body)    
  #        end
  #      rescue StandardError => e
  #        logger.error "Failed to get back results from geoname. Query: #{url_string}, error: #{e.message}"
  #        return ""
  #      end          
  #    end
  # 
  #    def self.make_destinations_from_xml(doc)
  #      h = Hpricot(doc)
  #      xml_dest = h.at("//geonames")
  #      dests = xml_dest.search("//geoname")
  #      destinations = Array.new
  #      dests.each do |dest|
  #        destinations << make_destination_from_xml(dest)
  #      end
  #      destinations
  #    end
  # 
  #    def self.make_destination_from_xml(hp_xml_geoname)
  #      #seems to be nil sometimes
  #      timezone = hp_xml_geoname.at("//timezone").inner_html.to_s unless hp_xml_geoname.at("//timezone").nil?     
  #      Destination.find_or_create_by_id(hp_xml_geoname.at("geonameid").inner_html.to_i) do |destination|
  #        destination.name            = (hp_xml_geoname.at("name").inner_html.to_s)
  #        destination.ascii_name      = (hp_xml_geoname.at("name").inner_html.to_s)
  #        destination.alternate_names = (hp_xml_geoname.at("alternatenames").inner_html.to_s)      
  #        destination.lat             = hp_xml_geoname.at("lat").inner_html.to_s
  #        destination.lng             = hp_xml_geoname.at("lng").inner_html.to_s
  #        destination.feature_class   = hp_xml_geoname.at("fcl").inner_html.to_s
  #        destination.feature_code    = hp_xml_geoname.at("fcode").inner_html.to_s
  #        destination.region_name     = hp_xml_geoname.at("adminname1").inner_html.to_s        
  #        destination.country_code    = hp_xml_geoname.at("countrycode").inner_html.to_s
  #        destination.admin1_code     = hp_xml_geoname.at("admincode1").inner_html.to_s
  #        destination.admin2_code     = hp_xml_geoname.at("admincode2").inner_html.to_s
  #        destination.population      = hp_xml_geoname.at("population").inner_html.to_s
  #        destination.elevation       = hp_xml_geoname.at("elevation").inner_html.to_s
  #        destination.time_zone       = timezone.to_s
  #      end
  #    end


end

