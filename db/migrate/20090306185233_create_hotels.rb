class CreateHotels < ActiveRecord::Migration
  def self.up
    execute <<-SQL
    
    CREATE TABLE IF NOT EXISTS `hotels` (
      `id` int(11) NOT NULL auto_increment,
      `wct_id` int(11) default NULL,
      `brand` varchar(255) default NULL,
      `name` varchar(255) default NULL,
      `address1` varchar(255) default NULL,
      `address2` varchar(255) default NULL,
      `city` varchar(255) default NULL,
      `state` varchar(255) default NULL,
      `country` varchar(255) default NULL,
      `zip` varchar(255) default NULL,
      `latitude` varchar(255) default NULL,
      `longitude` varchar(255) default NULL,
      `phone` varchar(255) default NULL,
      `online_bookings` varchar(1) default NULL,
      `hotrates` varchar(1) default NULL,
      `video` varchar(1) default NULL,
      `brochure` varchar(1) default NULL,
      `overview` varchar(1) default NULL,
      `reviews` varchar(1) default NULL,
      `map` varchar(1) default NULL,
      `price_band` varchar(1) default NULL,
      `star_rating` varchar(1) default NULL,
      `star_source` varchar(1) default NULL,
      `amenities` varchar(255) default NULL,
      `popularity_grade` varchar(1) default NULL,
      `collections_grade` varchar(1) default NULL,
      `desc` varchar(255) default NULL,
      `change_date` datetime default NULL,
      `lo_rate` varchar(255) default NULL,
      `hi_rate` varchar(255) default NULL,
      `currency` varchar(255) default NULL,
      `sabre_id` varchar(255) default NULL,
      `long_desc` text,
      `created_at` datetime default NULL,
      `updated_at` datetime default NULL,
      PRIMARY KEY  (`id`),
      KEY `index_hotels_on_latitude_and_longitude` (`latitude`,`longitude`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;
SQL
  end

  def self.down
    drop_table :hotels
  end
end
