class SettingTripsNotPublic < ActiveRecord::Migration
  def self.up
    change_column :trips, :public, :boolean, :null=>false, :default=>false
  end

  def self.down
  end
end
