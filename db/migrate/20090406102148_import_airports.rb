class ImportAirports < ActiveRecord::Migration
  def self.up   
    #from http://www.wasab.dk/morten/2003/12/nearestAirport/airports.sql.gz
    execute(IO.read("#{RAILS_ROOT}/db/data/airports.sql"))
  end

  def self.down
    Airport.delete_all
  end
end
