class AddIndexesOnDestinations < ActiveRecord::Migration
  def self.up
    add_index :destinations, :admin2_code
    add_index :destinations, :feature_code    
  end

  def self.down
    remove_index :destinations, :admin2_code
    remove_index :destinations, :feature_code    
  end
end
