
class DestinationPicture < ActiveRecord::Base 

  # :reduced used to display image before croping. The reduced dimension is 620 in width.
  # 4000 is mention as I don't think it's possible to specify only one dimension. But '>' 
  # will preserve aspect ratio...
  has_attached_file :picture, :url => "/images/destination_pictures/:id/:style/:basename.:extension",
    :path => "destination_pictures/:id/:style/:basename.:extension",
    :styles => {:medium => "800x600>" , :thumb => "95x70>"},
    :storage => :s3,
    :s3_credentials => "#{RAILS_ROOT}/config/amazon_s3.yml"

  belongs_to :attraction, :class_name => "Destination"
  validates_attachment_presence :picture

  def get_as_panoramio
    get_as_panoramio_pic = {:photo_title => self.picture_caption,
                            :photo_file_url => self.picture(:medium),
                            :owner => self.picture_author,
                            :owner_url => self.picture_url}
  end
  
end
