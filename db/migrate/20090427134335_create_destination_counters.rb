class CreateDestinationCounters < ActiveRecord::Migration
  def self.up
    create_table :destination_counters do |t|
      t.integer :destination_id
      t.integer :click_counter, :default => 0
    end
  end

  def self.down
    drop_table :destination_counters
  end
end
