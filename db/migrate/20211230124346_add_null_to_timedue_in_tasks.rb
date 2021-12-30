class AddNullToTimedueInTasks < ActiveRecord::Migration[6.1]
  def change
    change_column_null :tasks, :timedue, true
  end
end
