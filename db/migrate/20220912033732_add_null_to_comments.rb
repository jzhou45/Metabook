class AddNullToComments < ActiveRecord::Migration[5.2]
  def change
    change_column_null :comments, :commentable_id, false
    change_column_null :comments, :commentable_type, false
  end
end
