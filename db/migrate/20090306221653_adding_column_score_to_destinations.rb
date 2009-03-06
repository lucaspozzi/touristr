class AddingColumnScoreToDestinations < ActiveRecord::Migration
  def self.up
    add_column :destinations, :score, :integer, :default=>0, :null=>false
  end

  def self.down
    remove_column :destinations, :score
  end
end
