class ClickCountToDestinations < ActiveRecord::Migration
  def self.up
    add_column :destinations, :click_counter, :integer, :default=>0, :null=>false
  end

  def self.down
    remove_column :destinations, :click_counter
  end
end
