class HotelPicture < ActiveRecord::Base
  belongs_to :hotel, :foreign_key => "ezrez_id"
end
