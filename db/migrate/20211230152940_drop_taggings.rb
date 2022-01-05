class DropTaggings < ActiveRecord::Migration[6.1]
  def change
    drop_table :taggings
  end
end
