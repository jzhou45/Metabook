# == Schema Information
#
# Table name: comments
#
#  id               :bigint           not null, primary key
#  user_id          :integer          not null
#  commentable_id   :integer          not null
#  commentable_type :string           not null
#  comment          :text             not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#
class Comment < ApplicationRecord
    validates :user_id, :comment, :commentable_id, :commentable_type, presence: true

    belongs_to :user,
        foreign_key: :user_id,
        class_name: :User

    belongs_to :commentable,
        polymorphic: true

    has_many :comments,
        as: :commentable,
        dependent: :destroy 

end
