json.extract! post, :id, :user_id, :content, :comments, :likes
json.photo url_for(post.photo) if post.photo.attached?
