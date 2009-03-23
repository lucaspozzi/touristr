# == Schema Information
#
# Table name: destination_contents
#
#  id               :integer(4)    not null, primary key
#  destination_id   :integer(4)    
#  introduction     :text          
#  overview         :text          
#  attractions      :text          
#  created_at       :datetime      
#  updated_at       :datetime      
#  video_embed_code :text          
#


class DestinationContent < ActiveRecord::Base


  belongs_to :destination
  
  has_attached_file :picture, :url => "/images/attractions/:s3_id/:style/:basename.:extension",
    :styles => { :reduced => "620x4000>", :thumb => "95x70>"},
    :storage => :s3,
    :s3_credentials => "#{RAILS_ROOT}/config/amazon_s3.yml",
    :path => "attractions/:s3_id/:style/:basename.:extension"
    
  translates :introduction, :overview, :attractions
  
end

