class CreateTrips < ActiveRecord::Migration
  def self.up
    create_table :trips do |t|
      t.date        :starts_on, :ends_on
      t.integer     :number_of_days, :default=>0, :null=>false
      t.integer     :number_of_adults, :default=>1, :null=>false
      t.integer     :number_of_children, :default=>0, :null=>false
      t.boolean     :last_viewed, :default=>false, :null=>false
      t.boolean     :public, :default=>true, :null=>false
      t.string      :public_url, :private_url
      t.timestamps
    end
  end

  def self.down
    drop_table :trips
  end
end
