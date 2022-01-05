class SetDefaultPriorityToNoPriorityInTasks < ActiveRecord::Migration[6.1]
  def change
    change_column_default :tasks, :priority, 'No Priority'
  end
end
