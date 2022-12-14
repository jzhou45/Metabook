# == Schema Information
#
# Table name: posts
#
#  id         :bigint           not null, primary key
#  user_id    :integer          not null
#  content    :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Post < ApplicationRecord
    validates :user_id, :content, presence: true

    has_one_attached :photo
    
    belongs_to :poster,
        foreign_key: :user_id,
        class_name: :User

    has_many :comments,
        as: :commentable,
        dependent: :destroy 

    has_many :likes,
        as: :likeable,
        dependent: :destroy
end
