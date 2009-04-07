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
#  click_counter     :integer(4)    default(0), not null
#  score             :integer(4)    default(0), not null
#  delta             :boolean(1)    not null
#


class Destination < ActiveRecord::Base
  extend ActiveSupport::Memoizable
  include Trippy
  require 'open-uri'
  
  has_one :country, :foreign_key => :iso, :primary_key => :country_code
  has_one :destination_content
  has_many :trip_items, :as=>:trippy, :dependent=>:destroy
  has_many :destination_pictures
  acts_as_commentable
  acts_as_mappable
  friendly_param :name

  COUNTRY = "PCLI"
  COUNTRY_CLASS = "A"
  CITY_CLASS = "P"
  ADMIN_LEVEL1 = "ADM1"
  ADMIN_LEVEL2 = "ADM2"
  CITY_PREFIX = "PP"
  CITIES = %w(PPL PPLA PPLC PPLG PPLL PPLQ PPLR PPLS PPLW PPLX STLMT)

  MAX_DESTINATION_SEARCH = 25
  DESTINATIONS_PER_PAGE = 10  
  NB_PICS_TO_RETRIEVE = 8
  
  ATTRACTIONS = %w(AMUS PRK ANS ARCH ASTR CH BDG CSTL CTRS GDN HSTS MUS OBS PYR PRYS RLG RSRT SHRN SQR TOWR ZOO MNMT CMTY ISLS ISL CLF LK BAR)
  AREAS = [COUNTRY, ADMIN_LEVEL1, ADMIN_LEVEL2]

  define_index do
    indexes name, alternate_names, feature_class, feature_code, region_name, country_code, admin1_code, admin2_code
    has score, :sortable=>true, :type=>:integer
    set_property :delta=>true
    # some natural features don't have a country code. Maybe they span over several countries??
    where "country_code <> ''"
    
  end
  
  
  before_save :set_score



  def attractions
    potential_attractions = children
    Destination.find(potential_attractions, :conditions => ["feature_code in (?)", ATTRACTIONS])
  end

  
  def city?
    feature_code.start_with?(CITY_PREFIX)
  end
  
  def attraction?
    feature_code.in?(ATTRACTIONS)
  end
  
  def area?
    return feature_code.in?(AREAS)
  end
  alias_method :country?, :area?
  
  
  def city
    return self if city?
    return parent if attraction?
    nil
  end
  
  def parent
    case feature_code
    when COUNTRY: return self
    when ADMIN_LEVEL1: return Destination.find(:first, :conditions => ["country_code=? and feature_code=?", country_code, COUNTRY])
    when ADMIN_LEVEL2: return Destination.find(:first, :conditions => ["country_code=? and admin1_code=? and feature_code=?", country_code, admin1_code, ADMIN_LEVEL1])
    else
      if feature_code.in?(CITIES)
        # a city may be directly under ADM1 (e.g. galway) 
        p = Destination.find(:first, :conditions => ["country_code=? and admin1_code=? and admin2_code=? and feature_code=?", country_code, admin1_code, admin2_code, ADMIN_LEVEL2])
        return p unless p.nil?
        p = Destination.find(:first, :conditions => ["country_code=? and admin1_code=? and admin2_code=? and feature_code=?", country_code, admin1_code, admin2_code, ADMIN_LEVEL1])
        return p unless p.nil?
        # We return the country if unable to find a proper parent (e.g. 2964506 Dun Laoghaire -  )
        p = Destination.find(:first, :conditions => ["country_code=? and feature_code in (?)", country_code, COUNTRY])        
      elsif feature_code.in?(ATTRACTIONS)
        Destination.find(:first, :conditions => ["country_code=? and admin1_code=? and admin2_code=? and feature_class=?", country_code, admin1_code, admin2_code, CITY_CLASS], :order => "score desc")
      else
        Destination.find(:first, :conditions => ["country_code=? and admin1_code=?", country_code, admin1_code], :order => "score desc")
      end  
    end
  end
  
  
  def children(max = MAX_DESTINATION_SEARCH, page = 1)
    case feature_code
    when COUNTRY: return Destination.find(:all, :limit => max, :conditions => ["country_code=? and feature_class='P'", country_code], :order => "population DESC")
    when ADMIN_LEVEL1: return Destination.find(:all, :limit => max, :conditions => ["country_code=? and admin1_code=? and feature_class='P'", country_code, admin1_code], :order => "population DESC")
    when ADMIN_LEVEL2: return Destination.find(:all, :limit => max, :conditions => ["country_code=?  and admin1_code=? and admin2_code=? and feature_class='P'", country_code, admin1_code, admin2_code], :order => "score DESC")
    else
      if feature_code.in?(CITIES)
        # we want to return first the children with content
        all_children = Destination.find(:all, :include => :destination_content, :conditions => ["country_code=?  and admin1_code=? and admin2_code=? and feature_code in (?)", country_code, admin1_code, admin2_code, ATTRACTIONS], :order => "score DESC")
        no_content = Array.new
        content = Array.new
        all_children.each do |child|
          if child.destination_content.nil?
            no_content << child
          else
            content << child
          end
        end
        all_children = content + no_content
        return all_children.paginate(:page => page, :per_page => max)
      else 
        logger.error("Destination#children: got something not expected for #{self.id}: feature_code=#{feature_code}")
        nil
      end
    end
  end
  
  def children_page(page)
    children(DESTINATIONS_PER_PAGE, page)
  end
  
  def kids max = MAX_DESTINATION_SEARCH
    case feature_class 
      when COUNTRY_CLASS: Destination.find(:all, :limit => max, :conditions => ["country_code = ? and feature_class != ?", country_code, COUNTRY_CLASS], :order => "score DESC")
      when CITY_CLASS: Destination.all :limit => max, :conditions => ["country_code = ? and feature_class not in ('#{[COUNTRY_CLASS, CITY_CLASS].join("','")}')", country_code], :order => "score DESC"
    end
    # case feature_code
    # when COUNTRY: return Destination.find(:all, :limit => max, :conditions => "country_code='#{country_code}' and feature_class='P'", :order => "score DESC")
    # when ADMIN_LEVEL1: return Destination.find(:all, :limit => max, :conditions => "country_code='#{country_code}' and admin1_code='#{admin1_code}' and feature_class='P'", :order => "score DESC")
    # when ADMIN_LEVEL2: return Destination.find(:all, :limit => max, :conditions => "country_code='#{country_code}'  and admin1_code='#{admin1_code}' and admin2_code='#{admin2_code}' and feature_class='P'", :order => "score DESC")
    # else logger.error("Something else... #{feature_code}")
    # end
    
  end
  
  
  def self.s query, params = {}
    res_set = {}
    res = search(query, params.merge({:star => true, :order=>'score desc', :limit=>MAX_DESTINATION_SEARCH + 25}))
    # res.each do |dest|
    #   next if res_set.has_key? dest.name
    #   res_set[dest.name] = dest.id
    # end
    # 
    # res.delete_if{|dest| res_set[dest.name] != dest.id}
    res
  end
  
  def full_name
    parent_name = self.city? ? ", #{parent.name}" : ""
    "#{name}#{parent_name}, #{country_name}"  
  end
  
  def country_name
    country.country
  end
  
  def increment_click_counter
    self.click_counter +=1
    save
  end
  
# remove duplicates:
# delete t1 from destinations t1 inner join destinations t2 on t1.name = t2.name and t1.feature_code = t2.feature_code and t1.country_code = t2.country_code and t1.admin1_code = t2.admin1_code and t1.admin2_code = t2.admin2_code and t1.feature_class = t2.feature_class where t1.id < t2.id
  
# set the scores:  
#  update destinations set `score` = (((LENGTH(alternate_names) + 1) * 7) * (CASE feature_class WHEN 'P' THEN 2 ELSE 1 END) *  (CASE feature_class WHEN 'PPLA' THEN 5 WHEN 'AMUS' THEN 5 WHEN 'PRK' THEN 5 WHEN 'ANS' THEN 5 WHEN 'ARCH' THEN 5 WHEN 'ASTR' THEN 5 WHEN 'CH' THEN 5 WHEN 'BDG' THEN 5 WHEN 'CSTL' THEN 5 WHEN 'CTRS' THEN 5 WHEN 'GDN' THEN 5 WHEN 'HSTS' THEN 5 WHEN 'MUS' THEN 5 WHEN 'OBS' THEN 5 WHEN 'PYR' THEN 5 WHEN 'PRYS' THEN 5 WHEN 'RLG' THEN 5 WHEN 'RSRT' THEN 5 WHEN 'SHRN' THEN 5 WHEN 'SQR' THEN 5 WHEN 'TOWR' THEN 5 WHEN 'ZOO' THEN 5 WHEN 'MNMT' THEN 5 WHEN 'CMTY' THEN 5 WHEN 'ISLS' THEN 5 WHEN 'ISL' THEN 5 WHEN 'CLF' THEN 5 WHEN 'LK' THEN 5 WHEN 'BAR' THEN 5 ELSE 1 END) * (click_counter + 1) + (population / 5));

  
  def set_score
    self.score = (((alternate_names.size + 1) * 7) *
    (feature_class == 'P' ? 2 : 1) *
    (feature_class.in?(%w(H R T U)) ? 1 : 5) *
    (feature_code.in?(ATTRACTIONS) ? 5 : 1) *
    ((click_counter + 1) / 5)) +
    (population / 5)
  end
  
 
  def self.debug_search query
    s(query).each do |c| 
      puts("#{c.id} - #{c.feature_code} - #{c.name}") 
    end
    nil
  end
  
  def self.debug_hierarchy arr
    arr.each do |c|
      begin 
        puts("#{c.id} - #{c.feature_code} - #{c.name}")
      rescue Exception => e
        puts("#{e.message} occured with #{c.id}")
      end
    end
    nil
  end
  
  def get_pictures
    dest_pics = Array.new
    self.destination_pictures.each do |pic|
      dest_pics << pic.get_as_panoramio
    end
    logger.debug("retrieved #{dest_pics.size} pitures")
    if dest_pics.size < NB_PICS_TO_RETRIEVE
      logger.debug("retrieving #{NB_PICS_TO_RETRIEVE - dest_pics.size} from Panoramio")
      dest_pics += self.get_panoramio_pics(5, NB_PICS_TO_RETRIEVE - dest_pics.size)
    end
    logger.debug(dest_pics.inspect)
    dest_pics
  end
  
  def get_panoramio_pics(rad, nb_pics=NB_PICS_TO_RETRIEVE)
    start_time = Time.now
    begin # wrapping up nonessential code in case of failure it won't stop the request
      set = 'popular'
      bounds = get_bounding_box(rad.to_f)
  
      req = "http://www.panoramio.com/map/get_panoramas.php?order=popularity&set=#{set}&from=0&to=#{nb_pics}&minx=#{bounds[0][1]}&miny=#{bounds[0][0]}&maxx=#{bounds[1][1]}&maxy=#{bounds[1][0]}"
      #RAILS_DEFAULT_LOGGER.debug("Destination::Gateway.get_panoramio_pics: request: #{req}")
    
      pics_json = open(req + "&size=full").read
      #RAILS_DEFAULT_LOGGER.debug("Destination::Gateway.get_panoramio_pics: pics_json: #{pics_json}")
    
      dest_pics_url = Array.new   
      
      pics = ActiveSupport::JSON.decode pics_json
      pics["photos"].each do |p|
        dest_pics_url << {:photo_id => p["photo_id"],
          :photo_title => p["photo_title"], :photo_url => p["photo_url"], :photo_file_url => p["photo_file_url"], 
          :width => p["width"], :height => p["height"], :owner => p["owner_name"], :owner_url => p["owner_url"]}
      end
    rescue StandardError
      logger.error("Destination#get_panoramio_pics: error: #{$!}")
    end
    #puts("\n\n-----------------------------\nget_panoramio_pics took: #{Time.now - start_time}\n-----------------------------\n\n")
    return dest_pics_url
  end
  
  private
  
  def get_bounding_box(radius) #radius in miles
    
    deg_per_lat = 69.1
    deg_per_lng = (self.lat * Math::cos(self.lat * (Math::PI / 180.0))).abs
  
    lat_shift = radius / deg_per_lat
    lng_shift = radius / deg_per_lng
  
    min_lat = [self.lat - lat_shift, -90].max
    max_lat = [self.lat + lat_shift, 90].min
    min_lng = self.lng - lng_shift
    max_lng = self.lng + lng_shift
    min_lng += 360 if min_lng < -180
    max_lng -= 360 if max_lng > 180
  
    [[min_lat, min_lng], [max_lat, max_lng]]
  end
  
  
end
