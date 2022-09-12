class ReplaceComments < ActiveRecord::Migration[5.2]
  def change
    remove_index :comments, :comment_id
    remove_column :comments, :comment_id, :integer
    remove_index :comments, :user_id
    remove_column :comments, :user_id, :integer
  end
end
