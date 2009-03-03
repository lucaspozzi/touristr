class CreateLessAuthentication < ActiveRecord::Migration
  def self.up
    create_table :users do |t|
      t.column :login,                     :string
      t.column :crypted_password,          :string, :limit => 40
      t.column :salt,                      :string, :limit => 40
      t.column :created_at,                :datetime
      t.column :updated_at,                :datetime
      t.column :remember_token,            :string
      t.column :remember_token_expires_at, :datetime
    end
    create_table :people do |t|
      t.column :user_id,    :integer
      t.column :first_name, :string
      t.column :last_name,  :string
      t.column :icon,       :string
      t.column :email,                     :string
      t.column :created_at,                :datetime
      t.column :updated_at,                :datetime
    end
    add_index :users, :login
    add_index :people, :user_id
    
    
    
    
    create_table "sessions", :force => true do |t|
      t.column "sessid",     :string
      t.column "data",       :text
      t.column "updated_at", :datetime
      t.column "created_at", :datetime
    end

    add_index "sessions", ["sessid"], :name => "sessions_sessid_index"
    
    
    
  end

  def self.down
    remove_index :people, :user_id
    remove_index :users, :login
    remove_index :users, :login
    remove_index :users, :email
    drop_table :users
    drop_table :people
    drop_table :sessions
  end
end
