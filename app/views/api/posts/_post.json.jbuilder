json.extract! post, :id, :user_id, :content
json.photo url_for(post.photo) if post.photo.attached?
