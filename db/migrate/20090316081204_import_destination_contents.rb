class ImportDestinationContents < ActiveRecord::Migration
  def self.up
    config   = Rails::Configuration.new
    host     = config.database_configuration[RAILS_ENV]["host"]
    database = config.database_configuration[RAILS_ENV]["database"]
    username = config.database_configuration[RAILS_ENV]["username"]
    password = config.database_configuration[RAILS_ENV]["password"]
    params = ""
    if !host.nil?
      params << "-h #{host} "
    end
    if !username.nil?
      params << "-u #{username} "
    end
    if !password.nil?
      params << "-p#{pasword} "
    end
    system("mysql #{params} #{database} < #{RAILS_ROOT}/db/data/destination_contents.sql")
  end

  def self.down
    execute "DELETE from destination_contents;"
  end
end
