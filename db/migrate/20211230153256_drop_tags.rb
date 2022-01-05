class DropTags < ActiveRecord::Migration[6.1]
  def change
    drop_table :tags
  end
end
