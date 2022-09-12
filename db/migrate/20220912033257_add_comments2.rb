class AddComments2 < ActiveRecord::Migration[5.2]
  def change
    create_table :comments do |t|
      t.integer :user_id, null: false
      t.integer :commentable_id
      t.string :commentable_type
      t.text :comment, null: false
      t.timestamps
    end
    add_index :comments, :user_id
    add_index :comments, [:commentable_type, :commentable_id]
  end
end
