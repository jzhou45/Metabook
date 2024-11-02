# Metabook

## Brief Overview
Metabook is a clone of [Facebook](https://facebook.com) and has the functionality for profiles, newsfeeds, posts, comments, and likes.

## Technologies Used
  * Ruby
  * Ruby on Rails
  * JavaScript
  * jQuery
  * React
  * Redux
  * npm/webpack/babel
  * AWS S3/IAM
  * Heroku

## Splash
<img width="1440" alt="image" src="https://user-images.githubusercontent.com/98574332/186919132-f0ce41f6-d805-406c-8ef7-eed8522bc1d7.png">

## Newsfeed
![metabook_newsfeed_AdobeExpress (2)](https://user-images.githubusercontent.com/98574332/190830681-a8bd1351-a3fc-4d93-9985-77d7a9d4a1e8.gif)

## Posts
![make_posts_AdobeExpress](https://user-images.githubusercontent.com/98574332/190830843-41012084-db44-42cc-ad49-bb9389e8c978.gif)

## Comments and Replies
![comments_and_replies_AdobeExpress](https://user-images.githubusercontent.com/98574332/190830977-ed9df086-8e72-43fb-8312-fab4ccece5de.gif)

## Likes
![likes_AdobeExpress](https://user-images.githubusercontent.com/98574332/190831071-8a562b07-e49d-4e1b-adb3-d067b5b6f531.gif)

## Profile
![profile_AdobeExpress](https://user-images.githubusercontent.com/98574332/190831451-772be1fa-1e40-47ed-8763-3fe924dae24d.gif)

## Search
![Screen_Recording_2022-09-16_at_7_52_24_PM_AdobeExpress](https://user-images.githubusercontent.com/98574332/190831578-f8d6ab46-0739-45f0-8177-a6fd739d6806.gif)

## Code Snippets
To use comments with multiple foreign tables including itself, a polymorphic association had to be setup in the models and migration to reduce the need for having numerous foreign keys:
```ruby
#app/models/comment.rb
class Comment < ApplicationRecord
    belongs_to :commentable,
        polymorphic: true

    has_many :comments,
        as: :commentable,
        class_name: :Comment,
        dependent: :destroy
end

#app/models/post.rb
class Post < ApplicationRecord
    has_many :comments,
        as: :commentable,
        dependent: :destroy 
end
```

A filter will then be set up to separate the two types of comments for posts, as it contains both parent comments and replies, whilst the comments only contain replies, hence not requiring a filter:
```js
//frontend/components/newsfeed/post_item.jsx
{state.comments.map((comment, i) => {
    if (comment.commentable_type === "Post"){
        return(
            <Comment 
                key={i}
            />
        );
    };
})}

//frontend/components/newsfeed/comment_item.jsx
{(state.comments.map((reply, i) => {
    return(
        <Reply 
            key={i} 
        />
    );
}))}
```

Likes also had a similiar polymorphic setup, with the exception of having a uniquness validation to a user_id and the associated liked object, ridding the need for a filter on the frontend:

```ruby
#app/models/like.rb
class Like < ApplicationRecord
    validates :user_id, uniqueness: { scope: [:likeable_id, :likeable_type]}
    
    belongs_to :likeable,
        polymorphic: true
end

#app/models/post.rb
class Post < ApplicationRecord
    has_many :likes,
        as: :likeable,
        dependent: :destroy
end

#app/models/comment.rb
class Comment < ApplicationRecord
    has_many :likes,
        as: :likeable,
        dependent: :destroy
end
```

For comments and replies, in order to perform multiple asynchronous fetch requests at once to set the state of a component, an async/await helper function was used to wait for promises before setting the state:
```js
//frontend/components/newsfeed/comment_item.jsx
const fetchData = async () => {
    const userData = await fetchUser(comment.user_id);
    const commentData = await fetchComment(comment.id);

    setState({
        ...state,
        profilePhoto: userData.user.profilePhoto,
        firstName: userData.user.first_name,
        lastName: userData.user.last_name,
        comments: commentData.comment.comments,
        likes: commentData.comment.likes
    });
};

useEffect(() => {
    fetchData();
}, []);
```
