# Metabook

Metabook is a full-stack clone of [Facebook](https://facebook.com) built with Ruby on Rails, PostgreSQL, React, and Redux. Users can create posts with photos, comment and reply, like posts and comments, search for other users, and customize their profiles.

I built it solo as my full-stack project at App Academy in August–September 2022.

**Status:** Metabook is not currently deployed. It was hosted on Heroku until Heroku ended its free tier in November 2022. The GIFs below show the app running, and [Running locally](#running-locally) covers how to start it yourself.

## Features

- **Authentication:** sign up, log in, and log out, with a one-click demo login. Passwords are hashed with bcrypt, and sessions are tracked with a session token.
- **Newsfeed:** create, edit, and delete posts, with optional photo uploads.
- **Comments and replies:** comment on posts, reply to comments, and edit or delete your own.
- **Likes:** like and unlike both posts and comments.
- **Profiles:** each user has a profile with their posts, an editable About Me section, and uploadable profile and cover photos.
- **Search:** a navbar search that matches users by name and links to their profiles.

## Technologies Used

- **Backend:** Ruby, Ruby on Rails (JSON API with Jbuilder views), PostgreSQL, bcrypt
- **Frontend:** JavaScript, React, Redux, React Router, jQuery (AJAX requests to the API)
- **File storage:** Active Storage with AWS S3 and IAM
- **Build:** npm, webpack, Babel
- **Hosting (formerly):** Heroku

## Architecture

- Rails serves a single HTML page, and React handles all routing and rendering on the client.
- The React and Redux code in `frontend/` is bundled by webpack into `app/assets/javascripts/bundle.js`, which the Rails asset pipeline serves.
- The frontend talks to a JSON API under `/api`. Jbuilder templates shape each response.
- Photos are stored with Active Storage. Development and production use separate S3 buckets, and the credentials live in Rails' encrypted credentials.

The [wiki](https://github.com/jzhou45/Metabook/wiki) documents the [database schema](https://github.com/jzhou45/Metabook/wiki/Database-Schema), [API routes](https://github.com/jzhou45/Metabook/wiki/Backend-Routes), and the original design documents.

## Splash
<img width="1440" alt="Metabook splash page with the login form and demo login button" src="https://user-images.githubusercontent.com/98574332/186919132-f0ce41f6-d805-406c-8ef7-eed8522bc1d7.png">

## Newsfeed
![Scrolling the Metabook newsfeed](https://user-images.githubusercontent.com/98574332/190830681-a8bd1351-a3fc-4d93-9985-77d7a9d4a1e8.gif)

## Posts
![Creating a post on Metabook](https://user-images.githubusercontent.com/98574332/190830843-41012084-db44-42cc-ad49-bb9389e8c978.gif)

## Comments and Replies
![Commenting on a post and replying to a comment](https://user-images.githubusercontent.com/98574332/190830977-ed9df086-8e72-43fb-8312-fab4ccece5de.gif)

## Likes
![Liking posts and comments](https://user-images.githubusercontent.com/98574332/190831071-8a562b07-e49d-4e1b-adb3-d067b5b6f531.gif)

## Profile
![Viewing and editing a Metabook profile](https://user-images.githubusercontent.com/98574332/190831451-772be1fa-1e40-47ed-8763-3fe924dae24d.gif)

## Search
![Searching for users from the navbar](https://user-images.githubusercontent.com/98574332/190831578-f8d6ab46-0739-45f0-8177-a6fd739d6806.gif)

## Implementation Highlights

### Polymorphic comments and replies

A comment can belong to a post (a top-level comment) or to another comment (a reply). Instead of separate tables or a nullable foreign key for each parent type, `comments` uses a polymorphic `commentable` association, so one table serves both:

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

Each level renders only its own children. A post renders the comments whose parent is a post, and each comment renders its own replies, so replies never show up as top-level comments:

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

### Polymorphic likes with a uniqueness guarantee

Likes use the same polymorphic pattern, so posts and comments share one `likes` table. A user can like something only once. The model validates this, and a unique database index on `[user_id, likeable_id, likeable_type]` enforces it even if two requests arrive at the same time:

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

### Loading a comment's data

Each comment needs its author's name and photo as well as its own replies and likes. The component fetches the author, then the comment, and sets state once both requests finish:

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

The two requests run one after the other. They don't depend on each other, so `Promise.all` could run them in parallel.

## Running locally

**Requirements:** Ruby 3.1.2, Bundler, PostgreSQL, and Node 16.

1. Install dependencies. `npm install` also builds the frontend bundle.
   ```sh
   bundle install
   npm install
   ```
2. Configure file storage. Development uploads to S3 by default, which needs the project's `config/master.key`. To run without AWS, set `config.active_storage.service = :local` in `config/environments/development.rb`.
3. Create the database:
   ```sh
   bin/rails db:create db:migrate
   ```
4. Start the server. To rebuild the frontend whenever a file changes, also run `npm run webpack` in a second terminal.
   ```sh
   bin/rails server
   ```
5. Open http://localhost:3000 and sign up. New accounts get a default profile and cover photo.

To enable the **Demo Login** button, sign up once with the email `demouser@email.com` and the password `password`. The user in `db/seeds.rb` doesn't have the profile and cover photos that the API expects, so use the sign-up form instead of `db:seed`.
