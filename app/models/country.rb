# == Schema Information
#
# Table name: countries
#
#  id                   :integer(4)    not null, primary key
#  iso                  :string(255)   
#  iso3                 :string(255)   
#  iso_numeric          :integer(4)    
#  fips                 :string(255)   
#  country              :string(255)   
#  capital              :string(255)   
#  area_sqkm            :integer(4)    
#  population           :string(255)   
#  continent            :integer(4)    
#  tld                  :string(255)   
#  currency_code        :string(255)   
#  currency_name        :string(255)   
#  phone                :string(255)   
#  postal_code_format   :string(255)   
#  postal_code_regex    :string(255)   
#  languages            :string(255)   
#  geoname_id           :integer(4)    
#  neighbours           :string(255)   
#  equivalent_fips_code :string(255)   
#


class Country < ActiveRecord::Base
  
  has_many :destinations, :foreign_key=>:country_code
  
end
