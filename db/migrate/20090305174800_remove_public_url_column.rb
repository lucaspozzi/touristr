class RemovePublicUrlColumn < ActiveRecord::Migration
  def self.up
    remove_column :trips, :public_url
  end

  def self.down
    add_column :trips, :public_url, :string
  end
end
