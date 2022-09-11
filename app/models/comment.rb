# == Schema Information
#
# Table name: comments
#
#  id         :bigint           not null, primary key
#  user_id    :integer          not null
#  post_id    :integer          not null
#  comment    :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Comment < ApplicationRecord
    validates :user_id, :post_id, :comment, presence: true

    belongs_to :user,
        foreign_key: :user_id,
        class_name: :User

    belongs_to :post,
        foreign_key: :post_id,
        class_name: :Post
end
