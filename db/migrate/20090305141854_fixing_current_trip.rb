class FixingCurrentTrip < ActiveRecord::Migration
  def self.up
    remove_column :trips, :last_viewed
    add_column :people, :current_trip_id, :integer
  end

  def self.down
    remove_column :people, :current_trip_id
    add_column :trips, :last_viewed, :boolean,        :default => false, :null => false
  end
end
