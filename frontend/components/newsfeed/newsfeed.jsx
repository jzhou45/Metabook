import React, { useEffect, useState } from "react";
import PostItem from "./post_item";
import { Link } from "react-router-dom";
import { fetchPosts, fetchPost } from "../../actions/post_actions";
import { openModal } from "../../actions/modal_actions";
import { connect } from "react-redux";
import { fetchUser } from "../../actions/user_actions";

const Newsfeed = props => {
    const {userId, profilePhoto, firstName, fetchPosts, openModal, fetchPost, 
        fetchUser} = props;

    const [state, setState] = useState({
        userId: userId,
        posts: {}
    });

    useEffect(() => {
        fetchPosts()
            .then(posts => {
                setState({
                    ...state,
                    posts: posts.posts
                });
            });
    }, []);

    const rerenderParent = () => {
        fetchPosts().then(posts => {
            setState({
                ...state,
                posts: posts.posts
            });
        });
    };

    return(
        <div className="newsfeed">
            <div className="make-posts">
                <Link to={`/users/${userId}`}>
                    <img src={profilePhoto} alt="profile photo" />
                </Link>
                <input 
                    type="text" 
                    placeholder={`What's on your mind, ${firstName}?`}
                    onClick={() => openModal("makePosts", {rerenderParent})}
                />
            </div>

            <div className="all-posts">
                {Object.values(state.posts).map(post => (
                    <PostItem
                        post={post}
                        key={post.id}
                        rerenderParent={rerenderParent}
                        fetchUser={fetchUser}
                        currentUserId={userId}
                        fetchPost={fetchPost}
                        profilePhoto={profilePhoto}
                    />
                ))}
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    const userId = state.session.id;
    const currentUserInfo = state.entities.users[userId];
    return({
        userId,
        profilePhoto: currentUserInfo.profilePhoto,
        firstName: currentUserInfo.first_name
    });
};

const mapDispatchToProps = dispatch => ({
    fetchPosts: () => dispatch(fetchPosts()),
    openModal: (modal, props) => dispatch(openModal(modal, props)),
    fetchPost: postId => dispatch(fetchPost(postId)),
    fetchUser: userId => dispatch(fetchUser(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Newsfeed);