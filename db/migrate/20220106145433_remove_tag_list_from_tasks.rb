class RemoveTagListFromTasks < ActiveRecord::Migration[6.1]
  def change
    remove_column :tasks, :tag_list
  end
end
