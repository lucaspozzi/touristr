class AddCroppedColumnToDestinationContents < ActiveRecord::Migration
  def self.up
    add_column :destination_contents, :cropped, :boolean
    # we make the asumption that all the pictures we currently have in db have been cropped.
    # likely to be right since currently only admins can edit/create attraction
    DestinationContent.update_all("cropped=true")
  end

  def self.down
    remove_column :destination_attractions, :cropped
  end
end
