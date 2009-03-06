class RenamePrivateUrlColulmn < ActiveRecord::Migration
  def self.up
    rename_column :trips, :private_url, :private_identifier
  end

  def self.down
    rename_column :trips, :private_identifier, :private_url
  end
end
