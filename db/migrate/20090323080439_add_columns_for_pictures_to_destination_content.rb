class AddColumnsForPicturesToDestinationContent < ActiveRecord::Migration
  def self.up
    add_column :destination_contents, :picture_caption, :string
    add_column :destination_contents, :picture_author, :string
    add_column :destination_contents, :picture_url, :string
  end

  def self.down
    remove_column :destination_contents, :picture_url
    remove_column :destination_contents, :picture_author
    remove_column :destination_contents, :picture_caption
  end
end
