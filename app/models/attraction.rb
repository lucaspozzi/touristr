# == Schema Information
#
# Table name: attractions
#
#  id                   :integer(4)    not null, primary key
#  destination_id       :integer(4)    
#  name                 :string(255)   
#  created_at           :datetime      
#  updated_at           :datetime      
#  description          :text          
#  lat                  :decimal(15, 1 
#  lng                  :decimal(15, 1 
#  picture_file_name    :string(255)   
#  picture_content_type :string(255)   
#  picture_file_size    :integer(4)    
#  picture_updated_at   :datetime      
#  picture_caption      :string(255)   
#  picture_author       :string(255)   
#  picture_url          :string(255)   
#  cropped              :boolean(1)    
#  author_id            :integer(4)    
#  attraction_locale    :string(255)   default(en-US)
#  view_count           :integer(4)    default(0)
#  comment_count        :integer(4)    default(0)
#  vote_delta_count     :integer(4)    default(0)
#

class Attraction < ActiveRecord::Base    
#  translates :name, :description, :picture_caption
  
  # :reduced used to display image before croping. The reduced dimension is 620 in width.
  # 4000 is mention as I don't think it's possible to specify only one dimension. But '>' 
  # will preserve aspect ratio...
  has_attached_file :picture, :url => "/images/attractions/:id/:style/:basename.:extension",
    :styles => { :reduced => "620x4000>", :thumb => "95x70>"},
    :storage => :s3,
    :s3_credentials => "#{RAILS_ROOT}/config/amazon_s3.yml",
    :path => "attractions/:id/:style/:basename.:extension"

  validates_attachment_presence :picture

  # friendly_param :name
  # track_hits
  # acts_as_mappable 
  # acts_as_taggable
  # acts_as_voteable   
  acts_as_commentable

  belongs_to :destination

  belongs_to :author, :class_name => "User"
  # # has_many :selected_attractions, :class_name => "Destination::SelectedAttraction"
  #  # has_many :attraction_pictures, :dependent => :destroy, :order => "created_at DESC"
  #  
  #  validates_presence_of :name, :description
  #  
  #  QUERY_SORT_ORDER = 'view_count DESC, vote_delta_count DESC, comment_count DESC'
  #  
  #  DEFAULT_ATTRACTIONS_SEARCH_RADIUS = 5
  #  
  #  @@ATTRACTION_HOTELS_RADIUS = 10 #km
  #  @@NEARBY_ATTRACTIONS_RADIUS = 50 #km
  #  @@ATTRACTION_NB_HOTELS = 3
  #  @@ATTRACTION_NB_PICTURES = 9    
  # 
  #  @nearby_hotels_loaded = false
  #  def get_nearby_hotels
  #    if @nearby_hotels_loaded
  #      return @nearby_hotels
  #    end
  #    @nearby_hotels = Hotel::Hotel.find_hotels_from_DB_by_coordinates(self.lat, self.lng, @@ATTRACTION_HOTELS_RADIUS, "A", @@ATTRACTION_NB_HOTELS)
  #    @nearby_hotels_loaded = true
  #    return @nearby_hotels_loaded
  #  end
  #  
  #  @nearby_pictures_loaded = false
  #  def get_nearby_pictures
  #    if @nearby_pictures_loaded
  #      return @nearby_pictures
  #    end
  #    @nearby_pictures = Array.new
  #    self.attraction_pictures.each do |attr_pic| 
  #      @nearby_pictures << attr_pic.get_as_panoramio
  #    end
  # 
  #    @nearby_pictures.concat(Gateway.get_panoramio_pics(self.lat, self.lng, 1, @@ATTRACTION_NB_PICTURES-@nearby_pictures.size))
  #    @nearby_pictures_loaded = true
  #    return @nearby_pictures
  #  end
  #  
  #  def self.get_all_tags
  #    return nil if Attraction.count==0
  #    tags = Tag.find_by_sql("select distinct tags.name from tags, taggings where tags.id = taggings.tag_id and taggings.taggable_type = 'Destination::Attraction';")
  #    return tags
  #  end
  #  
  #  def self.get_nearby_attractions(lat, lng)
  #    return find(:all, :origin => [lat,lng], :within => @@NEARBY_ATTRACTIONS_RADIUS, :order => "distance")
  #  end
  #  
  #  def for_votes_as_percentage
  #    (votes_for / votes_count)*100.to_i
  #  end
  #  
  #  def description_markup
  #    val = description.nil? ? "" : description
  #    return RedCloth.new(val)
  #  end   
  # 
  #  def is_valid_editor?(user)
  #    begin
  #      #not logged in
  #      return false unless user
  #      #not author or admin
  #      return (author == user) || (user.is_admin?(false))
  #    rescue StandardError
  #      logger.error("Unable to determine if user is a valid editor - returning false")
  #      return false
  #    end        
  #  end
  #  
  #  def self.top_ten
  #    return find(:all, :include => :destination, :order => "view_count DESC", :limit => 10)
  #  end
  #  
end
