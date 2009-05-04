class CreateDestinationParents < ActiveRecord::Migration
  def self.up
    create_table :destination_parents do |t|
      t.integer :destination_id
      t.integer :parent_id      
      t.timestamps
    end
  end

  def self.down
    drop_table :destination_parents
  end
end
