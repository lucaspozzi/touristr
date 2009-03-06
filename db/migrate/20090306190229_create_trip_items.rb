class CreateTripItems < ActiveRecord::Migration
  def self.up
    create_table :trip_items do |t|
      t.integer     :trip_id, :trippy_id, :order
      t.string      :trippy_type
      t.timestamps
    end
  end

  def self.down
    drop_table :trip_items
  end
end
