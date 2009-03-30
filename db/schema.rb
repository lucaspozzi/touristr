# This file is auto-generated from the current state of the database. Instead of editing this file, 
# please use the migrations feature of Active Record to incrementally modify your database, and
# then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your database schema. If you need
# to create the application database on another system, you should be using db:schema:load, not running
# all the migrations from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20090330085218) do

  create_table "attractions", :force => true do |t|
    t.integer  "destination_id"
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "description"
    t.decimal  "lat",                  :precision => 15, :scale => 10
    t.decimal  "lng",                  :precision => 15, :scale => 10
    t.string   "picture_file_name"
    t.string   "picture_content_type"
    t.integer  "picture_file_size"
    t.datetime "picture_updated_at"
    t.string   "picture_caption"
    t.string   "picture_author"
    t.string   "picture_url"
    t.boolean  "cropped"
    t.integer  "author_id"
    t.string   "attraction_locale",                                    :default => "en-US"
    t.integer  "view_count",                                           :default => 0
    t.integer  "comment_count",                                        :default => 0
    t.integer  "vote_delta_count",                                     :default => 0
  end

  add_index "attractions", ["destination_id"], :name => "index_destination_attractions_on_destination_id"

  create_table "countries", :force => true do |t|
    t.string  "iso"
    t.string  "iso3"
    t.integer "iso_numeric"
    t.string  "fips"
    t.string  "country"
    t.string  "capital"
    t.integer "area_sqkm"
    t.string  "population"
    t.integer "continent"
    t.string  "tld"
    t.string  "currency_code"
    t.string  "currency_name"
    t.string  "phone"
    t.string  "postal_code_format"
    t.string  "postal_code_regex"
    t.string  "languages"
    t.integer "geoname_id"
    t.string  "neighbours"
    t.string  "equivalent_fips_code"
  end

  add_index "countries", ["iso"], :name => "index_countries_on_iso"

  create_table "destination_attractions", :force => true do |t|
    t.integer  "destination_id"
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "description"
    t.decimal  "lat",                  :precision => 15, :scale => 10
    t.decimal  "lng",                  :precision => 15, :scale => 10
    t.string   "picture_file_name"
    t.string   "picture_content_type"
    t.integer  "picture_file_size"
    t.datetime "picture_updated_at"
    t.string   "picture_caption"
    t.string   "picture_author"
    t.string   "picture_url"
    t.boolean  "cropped"
    t.integer  "author_id"
    t.string   "attraction_locale",                                    :default => "en-US"
    t.integer  "view_count",                                           :default => 0
    t.integer  "comment_count",                                        :default => 0
    t.integer  "vote_delta_count",                                     :default => 0
  end

  add_index "destination_attractions", ["destination_id"], :name => "index_destination_attractions_on_destination_id"

  create_table "destination_content_translations", :force => true do |t|
    t.integer  "destination_content_id"
    t.string   "locale"
    t.text     "attractions"
    t.text     "introduction"
    t.text     "overview"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "destination_contents", :force => true do |t|
    t.integer  "destination_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "video_embed_code"
    t.string   "locale",               :default => "en", :null => false
    t.string   "picture_file_name"
    t.string   "picture_content_type"
    t.integer  "picture_file_size"
    t.datetime "picture_updated_at"
    t.integer  "author_id"
    t.string   "picture_caption"
    t.string   "picture_author"
    t.string   "picture_url"
    t.integer  "compatibility_id"
    t.boolean  "cropped"
  end

  add_index "destination_contents", ["destination_id"], :name => "index_destination_contents_on_destination_id"

  create_table "destinations", :force => true do |t|
    t.string   "name"
    t.string   "ascii_name"
    t.string   "alternate_names"
    t.decimal  "lng",                             :precision => 15, :scale => 10
    t.decimal  "lat",                             :precision => 15, :scale => 10
    t.string   "feature_class",     :limit => 1
    t.string   "feature_code",      :limit => 10
    t.string   "region_name",       :limit => 40
    t.string   "country_code",      :limit => 2
    t.string   "cc2",               :limit => 60
    t.string   "admin1_code",       :limit => 20
    t.string   "admin2_code",       :limit => 80
    t.string   "admin3_code",       :limit => 20
    t.string   "admin4_code",       :limit => 20
    t.integer  "population"
    t.integer  "elevation"
    t.integer  "gtopo30"
    t.string   "time_zone"
    t.date     "modification_date"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "click_counter",                                                   :default => 0, :null => false
    t.integer  "score",                                                           :default => 0, :null => false
    t.boolean  "delta",                                                                          :null => false
  end

  add_index "destinations", ["admin1_code"], :name => "index_destinations_on_admin1_code"
  add_index "destinations", ["admin2_code"], :name => "index_destinations_on_admin2_code"
  add_index "destinations", ["alternate_names"], :name => "index_destinations_on_alternate_names"
  add_index "destinations", ["country_code"], :name => "index_destinations_on_country_code"
  add_index "destinations", ["feature_class"], :name => "index_destinations_on_feature_class"
  add_index "destinations", ["feature_code"], :name => "index_destinations_on_feature_code"
  add_index "destinations", ["name"], :name => "index_destinations_on_name"

  create_table "hotels", :force => true do |t|
    t.integer  "wct_id"
    t.string   "brand"
    t.string   "name"
    t.string   "address1"
    t.string   "address2"
    t.string   "city"
    t.string   "state"
    t.string   "country"
    t.string   "zip"
    t.string   "latitude"
    t.string   "longitude"
    t.string   "phone"
    t.string   "online_bookings",   :limit => 1
    t.string   "hotrates",          :limit => 1
    t.string   "video",             :limit => 1
    t.string   "brochure",          :limit => 1
    t.string   "overview",          :limit => 1
    t.string   "reviews",           :limit => 1
    t.string   "map",               :limit => 1
    t.string   "price_band",        :limit => 1
    t.string   "star_rating",       :limit => 1
    t.string   "star_source",       :limit => 1
    t.string   "amenities"
    t.string   "popularity_grade",  :limit => 1
    t.string   "collections_grade", :limit => 1
    t.string   "desc"
    t.datetime "change_date"
    t.string   "lo_rate"
    t.string   "hi_rate"
    t.string   "currency"
    t.string   "sabre_id"
    t.text     "long_desc"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "hotels", ["latitude", "longitude"], :name => "index_hotels_on_latitude_and_longitude"

  create_table "people", :force => true do |t|
    t.integer  "user_id"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "icon"
    t.string   "email"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "current_trip_id"
  end

  add_index "people", ["user_id"], :name => "index_people_on_user_id"

  create_table "sessions", :force => true do |t|
    t.string   "sessid"
    t.text     "data"
    t.datetime "updated_at"
    t.datetime "created_at"
  end

  add_index "sessions", ["sessid"], :name => "sessions_sessid_index"

  create_table "todos", :force => true do |t|
    t.integer  "person_id"
    t.string   "title"
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "done",        :default => false, :null => false
  end

  create_table "trip_items", :force => true do |t|
    t.integer  "trip_id"
    t.integer  "trippy_id"
    t.integer  "ordered"
    t.string   "trippy_type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "trip_memberships", :force => true do |t|
    t.integer  "person_id"
    t.integer  "trip_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "trips", :force => true do |t|
    t.date     "starts_on"
    t.date     "ends_on"
    t.integer  "number_of_days",     :default => 0,     :null => false
    t.integer  "number_of_adults",   :default => 1,     :null => false
    t.integer  "number_of_children", :default => 0,     :null => false
    t.boolean  "public",             :default => false, :null => false
    t.string   "private_identifier"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "name"
  end

  create_table "users", :force => true do |t|
    t.string   "login"
    t.string   "crypted_password",          :limit => 40
    t.string   "salt",                      :limit => 40
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "remember_token"
    t.datetime "remember_token_expires_at"
  end

  add_index "users", ["login"], :name => "index_users_on_login"

end
