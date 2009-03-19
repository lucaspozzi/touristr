class AddLocaleToDestinationContents < ActiveRecord::Migration
  def self.up
    add_column :destination_contents, :locale, :string, :default => "en", :null => false
  end

  def self.down
    remove_column :destination_contents, :locale
  end
end
