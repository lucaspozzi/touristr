class CreateAirports < ActiveRecord::Migration
  def self.up    
    create_table :airports do |table|
      table.column :iata_code, :string
      table.column :country_code, :string
      table.column :lng, :decimal, :precision => 15, :scale => 10
      table.column :lat, :decimal, :precision => 15, :scale => 10
      table.column :name, :string
      table.column :timezone, :string
      table.column :short_name, :string
    end
  end

  def self.down
    drop_table :airports
  end
end
