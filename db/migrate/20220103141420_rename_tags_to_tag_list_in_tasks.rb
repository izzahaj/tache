class RenameTagsToTagListInTasks < ActiveRecord::Migration[6.1]
  def up
    rename_column :tasks, :tags, :tag_list
  end

  def down
    rename_column :tasks, :tag_list, :tags
  end
end
