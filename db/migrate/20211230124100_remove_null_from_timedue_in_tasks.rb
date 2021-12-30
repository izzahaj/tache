class RemoveNullFromTimedueInTasks < ActiveRecord::Migration[6.1]
  def change
    change_column_null :tasks, :timedue, false
  end
end
