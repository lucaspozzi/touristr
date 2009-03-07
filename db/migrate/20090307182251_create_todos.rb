class CreateTodos < ActiveRecord::Migration
  def self.up
    create_table :todos do |t|
      t.integer     :person_id
      t.string      :title
      t.text        :description
      t.timestamps
    end
  end

  def self.down
    drop_table :todos
  end
end
