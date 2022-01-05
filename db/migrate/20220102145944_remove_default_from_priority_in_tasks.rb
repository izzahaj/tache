class RemoveDefaultFromPriorityInTasks < ActiveRecord::Migration[6.1]
  def change
    change_column_default :tasks, :priority, nil
  end
end
