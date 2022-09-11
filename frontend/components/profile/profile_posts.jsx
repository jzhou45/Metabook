import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchPost, fetchPosts } from "../../actions/post_actions";
import { fetchUser } from "../../actions/user_actions";
import PostItem from "../newsfeed/post_item";

const ProfilePosts = props => {
    const {currentUserId, usersId, profilePhoto, firstName, lastName, fetchPost,
    fetchPosts, fetchUser, openModal} = props;

    const [state, setState] = useState({
        posts: {}
    });

    useEffect(() => {
        fetchPosts().then(data => {
            const userPosts = {};
            for (let post of Object.values(data.posts)){
                if (post.user_id === usersId){
                    userPosts[post.id] = post;
                };
            };
            setState({
                ...state,
                posts: userPosts
            });
        });
    }, []);

    const rerenderProfilePosts = () => {
        fetchPosts().then(data => {
            const userPosts = {};
            for (let post of Object.values(data.posts)){
                if (post.user_id === usersId){
                    userPosts[post.id] = post;
                };
            };
            setState({
                ...state,
                posts: userPosts
            });
        });
    };

    return(
        <div className="profile-posts">
            {(currentUserId === usersId) ?
            (<div className="profile-make-posts">
                <img 
                    src={profilePhoto} alt="profile Photo" 
                />
                <input 
                    type="text" 
                    placeholder={`What's on your mind, ${firstName}?`}
                    onClick={() => openModal("makePosts", {rerenderNewsfeed})}
                />
            </div>) :
            null}

            <div className="profile-all-posts">
                {Object.values(state.posts).map(post => (
                    <PostItem 
                        key={post.id}
                        post={post}
                        rerenderProfilePosts={rerenderProfilePosts}
                        fetchUser={fetchUser}
                        currentUserId={currentUserId}
                        fetchPost={fetchPost}
                    />
                ))}
            </div>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    const currentUserId = state.session.id;
    const usersId = parseInt(ownProps.location.pathname.split("/")[2]);
    const user = state.entities.users[currentUserId];

    return({
        currentUserId,
        usersId,
        profilePhoto: user.profilePhoto,
        firstName : user.first_name,
        lastName: user.last_name
    });
};

const mapDispatchToProps = dispatch => ({
    fetchPosts: () => dispatch(fetchPosts()),
    fetchPost: post => dispatch(fetchPost(post)),
    fetchUser: userId => dispatch(fetchUser(userId)),
    openModal: (modal, props) => dispatch(openModal(modal, props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePosts);