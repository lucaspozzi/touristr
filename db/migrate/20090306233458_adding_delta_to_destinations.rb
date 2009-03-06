class AddingDeltaToDestinations < ActiveRecord::Migration
  def self.up
    add_column :destinations, :delta, :boolean, :null=>false
  end

  def self.down
    remove_column :destinations, :delta
  end
end
