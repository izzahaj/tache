class CreateTasks < ActiveRecord::Migration[6.1]
  def change
    create_table :tasks do |t|
      t.string :description, null: false
      t.string :deadline
      t.string :timedue
      t.string :priority, null: false

      t.timestamps
    end
  end
end
