class CreateDestinationContentsTranslation < ActiveRecord::Migration
  def self.up
    DestinationContent.create_translation_table! :introduction => :text, :overview => :text, :attractions => :text
    execute "insert into destination_content_translations (destination_content_id, locale, overview, attractions, introduction) select id, 'en', overview, attractions, introduction from destination_contents;"
    remove_column :destination_contents, :introduction
    remove_column :destination_contents, :overview
    remove_column :destination_contents, :attractions
  end

  def self.down
    raise ActiveRecord::IrreversibleMigration, "You cannot revert the Globalization of DestinationContent"
  end
end
