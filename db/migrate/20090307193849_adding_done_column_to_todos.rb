class AddingDoneColumnToTodos < ActiveRecord::Migration
  def self.up
    add_column :todos, :done, :boolean, :null=>false, :default=>false
  end

  def self.down
    remove_column :todos, :done
  end
end
