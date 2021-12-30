class ChangeDeadlineToBeDateInTasks < ActiveRecord::Migration[6.1]
  def change
    change_column :tasks, :deadline, :date, using: 'deadline::date'
  end
end
