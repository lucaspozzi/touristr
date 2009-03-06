class RenameCountryTimezoneColumn < ActiveRecord::Migration
  def self.up
    rename_column :destinations, :timezone, :time_zone
  end

  def self.down
    rename_column :destinations, :time_zone, :timezone
  end
end
