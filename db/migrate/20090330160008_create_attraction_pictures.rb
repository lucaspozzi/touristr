class CreateAttractionPictures < ActiveRecord::Migration
  def self.up
    create_table :destination_pictures do |t|
      t.column :destination_id, :integer
      t.column :picture_caption, :string
      t.column :picture_author, :string
      t.column :picture_url, :string
      t.column :picture_file_name, :string 
      t.column :picture_content_type, :string 
      t.column :picture_file_size, :integer 
      t.column :picture_updated_at, :datetime
      t.timestamps
    end
  end
  
  def self.down
    drop_table :attraction_pictures
  end
end
