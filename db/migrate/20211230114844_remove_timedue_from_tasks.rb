class RemoveTimedueFromTasks < ActiveRecord::Migration[6.1]
  def change
    remove_column :tasks, :timedue, :string
  end
end
