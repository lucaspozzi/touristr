class ImportAttractionsAsDestinations < ActiveRecord::Migration
  def self.up
    add_column :destination_contents, :compatibility_id, :integer

    f = File.new("#{RAILS_ROOT}/db/data/attractions.txt", "r")
    f.readlines.each do |attraction|
      a = attraction.split("~")
      d = Destination.new(:name => a[0], :alternate_names => a[0],
                          :lat => a[1], :lng => a[2], 
                          :feature_class => "L", :feature_code => "AMUS",
                          :country_code    => a[3],   
                          :admin1_code     => a[4],   
                          :admin2_code     => a[5],   
                          :admin3_code     => a[6],   
                          :admin4_code     => a[7],
                          :time_zone       => a[8],
                          :population      => 0)
                          
      d.save(false)
      puts("picture: #{a[10]}")
      d.create_destination_content(:introduction => a[9].gsub("CR_TOKEN", "\n"))
                                   # :picture_file_name => a[10],
                                   # :picture_content_type => a[11],
                                   # :picture_file_size => a[12],
                                   # :picture_caption => a[13],
                                   # :picture_author => a[14],
                                   # :picture_url => a[15])
      d.destination_content.update_attributes(:picture_file_name => a[10],
                                    :picture_content_type => a[11],
                                    :picture_file_size => a[12],
                                    :picture_caption => a[13],
                                    :picture_author => a[14],
                                    :picture_url => a[15],
                                    :compatibility_id => a[16])
    end
  end

  def self.down
   DestinationContent.delete(:all)
   remove_column :destination_contents, :compatibility_id
  end
end
