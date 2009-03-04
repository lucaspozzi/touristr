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
  # 
  # def introduction_markup
  #   introduction.nil? ? val = "" : val = introduction
  #   return RedCloth.new(val)
  # end
  # 
  # def overview_markup
  #   overview.nil? ? val = "" : val = overview
  #   return RedCloth.new(val)
  # end
  # 
  # def attractions_markup
  #   attractions.nil? ? val = "" : val = attractions
  #   return RedCloth.new(val)
  # end

end

