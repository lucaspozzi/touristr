class AddAuthorColumnToDestinationContent < ActiveRecord::Migration
  def self.up
    add_column :destination_contents, :author_id, :integer
  end

  def self.down
    remove_column :destination_contents, :author_id
  end
end
