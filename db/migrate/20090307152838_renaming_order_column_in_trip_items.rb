class RenamingOrderColumnInTripItems < ActiveRecord::Migration
  def self.up
    rename_column :trip_items, :order, :ordered
  end

  def self.down
    rename_column :trip_items, :ordered, :order
  end
end
