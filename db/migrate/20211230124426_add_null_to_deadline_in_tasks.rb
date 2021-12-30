class AddNullToDeadlineInTasks < ActiveRecord::Migration[6.1]
  def change
    change_column_null :tasks, :deadline, true
  end
end
