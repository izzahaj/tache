class ChangeTimedueToStringInTasks < ActiveRecord::Migration[6.1]
  def change
    change_column :tasks, :timedue, :string
  end
end
