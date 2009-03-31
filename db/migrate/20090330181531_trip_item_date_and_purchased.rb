class TripItemDateAndPurchased < ActiveRecord::Migration
  def self.up
    add_column :trip_items, :starts_at, :datetime
    add_column :trip_items, :ends_at, :datetime
    add_column :trip_items, :purchased, :boolean, :default=>false, :null=>false
  end

  def self.down
    remove_column :trip_items, :purchased
    remove_column :trip_items, :ends_on
    remove_column :trip_items, :starts_on
  end
end
