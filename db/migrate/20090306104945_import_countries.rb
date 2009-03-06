class ImportCountries < ActiveRecord::Migration
  def self.up
    sqlString = "LOAD DATA LOCAL INFILE '#{RAILS_ROOT}/db/data/geonames_countryInfo.txt' INTO TABLE countries"
    sqlString += " FIELDS TERMINATED BY '\t'"
    sqlString += " (iso, iso3, iso_numeric, fips, country, capital, area_sqkm, population, continent, tld, currency_code, currency_name, phone, postal_code_format, postal_code_regex, languages, geoname_id, neighbours, equivalent_fips_code)"
    execute sqlString  
  end

  def self.down
    execute "delete from countries"
  end
end
