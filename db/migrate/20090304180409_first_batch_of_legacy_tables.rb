class FirstBatchOfLegacyTables < ActiveRecord::Migration
  def self.up
    execute <<-SQL
    CREATE TABLE IF NOT EXISTS `attractions` (
      `id` int(11) NOT NULL auto_increment,
      `destination_id` int(11) default NULL,
      `name` varchar(255) default NULL,
      `created_at` datetime default NULL,
      `updated_at` datetime default NULL,
      `description` text,
      `lat` decimal(15,10) default NULL,
      `lng` decimal(15,10) default NULL,
      `picture_file_name` varchar(255) default NULL,
      `picture_content_type` varchar(255) default NULL,
      `picture_file_size` int(11) default NULL,
      `picture_updated_at` datetime default NULL,
      `picture_caption` varchar(255) default NULL,
      `picture_author` varchar(255) default NULL,
      `picture_url` varchar(255) default NULL,
      `cropped` tinyint(1) default NULL,
      `author_id` int(11) default NULL,
      `attraction_locale` varchar(255) default 'en-US',
      `view_count` int(11) default '0',
      `comment_count` int(11) default '0',
      `vote_delta_count` int(11) default '0',
      PRIMARY KEY  (`id`),
      KEY `index_destination_attractions_on_destination_id` (`destination_id`)
    ) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=177 ;
SQL
      execute <<-SQL
    CREATE TABLE IF NOT EXISTS `countries` (
      `id` int(11) NOT NULL auto_increment,
      `iso` varchar(255) default NULL,
      `iso3` varchar(255) default NULL,
      `iso_numeric` int(11) default NULL,
      `fips` varchar(255) default NULL,
      `country` varchar(255) default NULL,
      `capital` varchar(255) default NULL,
      `area_sqkm` int(11) default NULL,
      `population` varchar(255) default NULL,
      `continent` int(11) default NULL,
      `tld` varchar(255) default NULL,
      `currency_code` varchar(255) default NULL,
      `currency_name` varchar(255) default NULL,
      `phone` varchar(255) default NULL,
      `postal_code_format` varchar(255) default NULL,
      `postal_code_regex` varchar(255) default NULL,
      `languages` varchar(255) default NULL,
      `geoname_id` int(11) default NULL,
      `neighbours` varchar(255) default NULL,
      `equivalent_fips_code` varchar(255) default NULL,
      PRIMARY KEY  (`id`),
      KEY `index_countries_on_iso` (`iso`)
    ) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=248 ;
SQL


  execute <<-SQL
    CREATE TABLE IF NOT EXISTS `destinations` (
      `id` int(11) NOT NULL auto_increment,
      `name` varchar(255) default NULL,
      `ascii_name` varchar(255) default NULL,
      `alternate_names` varchar(255) default NULL,
      `lng` decimal(15,10) default NULL,
      `lat` decimal(15,10) default NULL,
      `feature_class` varchar(1) default NULL,
      `feature_code` varchar(10) default NULL,
      `region_name` varchar(40) default NULL,
      `country_code` varchar(2) default NULL,
      `cc2` varchar(60) default NULL,
      `admin1_code` varchar(20) default NULL,
      `admin2_code` varchar(80) default NULL,
      `admin3_code` varchar(20) default NULL,
      `admin4_code` varchar(20) default NULL,
      `population` int(11) default NULL,
      `elevation` int(11) default NULL,
      `gtopo30` int(11) default NULL,
      `timezone` varchar(255) default NULL,
      `modification_date` date default NULL,
      `created_at` datetime default NULL,
      `updated_at` datetime default NULL,
      `country_name` varchar(255) default NULL,
      PRIMARY KEY  (`id`),
      KEY `index_destinations_on_country_code` (`country_code`),
      KEY `index_destinations_on_admin1_code` (`admin1_code`),
      KEY `index_destinations_on_feature_class` (`feature_class`),
      KEY `index_destinations_on_name` (`name`),
      KEY `index_destinations_on_alternate_names` (`alternate_names`)
    ) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6695953 ;
SQL

  execute <<-SQL
    CREATE TABLE IF NOT EXISTS `destination_contents` (
      `id` int(11) NOT NULL auto_increment,
      `destination_id` int(11) default NULL,
      `introduction` text,
      `overview` text,
      `attractions` text,
      `created_at` datetime default NULL,
      `updated_at` datetime default NULL,
      `video_embed_code` text,
      PRIMARY KEY  (`id`),
      KEY `index_destination_content_on_destination_id` (`destination_id`)
    ) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=56 ; 
SQL
  end

  def self.down
    drop_table :attractions
    drop_table :countries
    drop_table :destination
    drop_table :destination_contents
  end
end
