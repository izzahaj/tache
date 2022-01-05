class AddTagsToTasks < ActiveRecord::Migration[6.1]
  def change
    add_column :tasks, :tags, :string, array: true, default: []
    add_index :tasks, :tags, using: 'gin'
  end
end
