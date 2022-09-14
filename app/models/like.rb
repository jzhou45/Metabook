# == Schema Information
#
# Table name: likes
#
#  id            :bigint           not null, primary key
#  user_id       :integer          not null
#  likeable_id   :integer          not null
#  likeable_type :string           not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
class Like < ApplicationRecord
    validates :user_id, :likeable_id, :likeable_type, presence: true
    validates :user_id, uniqueness: { scope: [:likeable_id, :likeable_type]}

    belongs_to :user,
        foreign_key: :user_id,
        class_name: :User

    belongs_to :likeable,
        polymorphic: true
end
