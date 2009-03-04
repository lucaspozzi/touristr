class CreateTripMemberships < ActiveRecord::Migration
  def self.up
    create_table :trip_memberships do |t|
      t.integer     :person_id, :trip_id
      t.timestamps
    end
  end

  def self.down
    drop_table :trip_memberships
  end
end
