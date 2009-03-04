class CreateTripMembers < ActiveRecord::Migration
  def self.up
    create_table :trip_members do |t|
      t.intergers     :person_id, :trip_id
      t.timestamps
    end
  end

  def self.down
    drop_table :trip_members
  end
end
