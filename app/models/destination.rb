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
  
  
  has_one :country, :foreign_key => :iso, :primary_key => :country_code
  has_one :destination_content
  has_many :trip_items, :as=>:trippy, :dependent=>:destroy
  acts_as_commentable


  COUNTRY = "PCLI"
  COUNTRY_CLASS = "A"
  CITY_CLASS = "P"
  ADMIN_LEVEL1 = "ADM1"
  ADMIN_LEVEL2 = "ADM2"
  MAX_DESTINATION_SEARCH = 25
  CITY_PREFIX = "PP"
  CITIES = %w(PPL PPLA PPLC PPLG PPLL PPLQ PPLR PPLS PPLW PPLX STLMT)
  

  ATTRACTIONS = %w(AMUS PRK ANS ARCH ASTR CH BDG CSTL CTRS GDN HSTS MUS OBS PYR PRYS RLG RSRT SHRN SQR TOWR ZOO MNMT CMTY ISLS ISL CLF LK)
  AREAS = [COUNTRY, ADMIN_LEVEL1, ADMIN_LEVEL2]

  define_index do
    indexes name, alternate_names, feature_class, feature_code, region_name, country_code, admin1_code, admin2_code
    has score, :sortable=>true, :type=>:integer
    set_property :delta=>true
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
  
  
  def parent
    puts(self.feature_code)
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
      end  
    end
  end
  
  
  def children(max = MAX_DESTINATION_SEARCH)
    case feature_code
    when COUNTRY: return Destination.find(:all, :limit => max, :conditions => ["country_code=? and feature_class='P'", country_code], :order => "population DESC")
    when ADMIN_LEVEL1: return Destination.find(:all, :limit => max, :conditions => ["country_code=? and admin1_code=? and feature_class='P'", country_code, admin1_code], :order => "population DESC")
    when ADMIN_LEVEL2: return Destination.find(:all, :limit => max, :conditions => ["country_code=?  and admin1_code=? and admin2_code=? and feature_class='P'", country_code, admin1_code, admin2_code], :order => "score DESC")
    else
      if feature_code.in?(CITIES)
        return Destination.find(:all, :limit => max, :conditions => ["country_code=?  and admin1_code=? and admin2_code=? and feature_code in (?)", country_code, admin1_code, admin2_code, ATTRACTIONS], :order => "score DESC")
      else 
        logger.error("Something else... #{feature_code}")
      end
    end
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
    res.each do |dest|
      next if res_set.has_key? dest.name
      res_set[dest.name] = dest.id
    end
    
    res.delete_if{|dest| res_set[dest.name] != dest.id}
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
#  update destinations set `score` = (((LENGTH(alternate_names) + 1) * 7) * (CASE feature_class WHEN 'P' THEN 2 ELSE 1 END) *  (CASE feature_class WHEN 'PPLA' THEN 5 WHEN 'AMUS' THEN 5 WHEN 'PRK' THEN 5 WHEN 'ANS' THEN 5 WHEN 'ARCH' THEN 5 WHEN 'ASTR' THEN 5 WHEN 'CH' THEN 5 WHEN 'BDG' THEN 5 WHEN 'CSTL' THEN 5 WHEN 'CTRS' THEN 5 WHEN 'GDN' THEN 5 WHEN 'HSTS' THEN 5 WHEN 'MUS' THEN 5 WHEN 'OBS' THEN 5 WHEN 'PYR' THEN 5 WHEN 'PRYS' THEN 5 WHEN 'RLG' THEN 5 WHEN 'RSRT' THEN 5 WHEN 'SHRN' THEN 5 WHEN 'SQR' THEN 5 WHEN 'TOWR' THEN 5 WHEN 'ZOO' THEN 5 ELSE 1 END) * ((click_counter + 1) / ) + (population / 5))
  
  def set_score
    self.score = (((alternate_names.size + 1) * 7) *
    (feature_class == 'P' ? 2 : 1) *
    (feature_class.in?(%w(H R T U)) ? 1 : 5) *
    (feature_code.in?(%w(PPLA AMUS PRK ANS ARCH ASTR CH BDG CSTL CTRS GDN HSTS MUS OBS PYR PRYS RLG RSRT SHRN SQR TOWR ZOO)) ? 5 : 1) *
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
  
  
  
end
