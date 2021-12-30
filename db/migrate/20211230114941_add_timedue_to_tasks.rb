class AddTimedueToTasks < ActiveRecord::Migration[6.1]
  def change
    add_column :tasks, :timedue, :time
  end
end
