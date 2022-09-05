import React, { useEffect, useState } from "react";
import PostItem from "./post_item";
import { Link } from "react-router-dom";
import { fetchPosts } from "../../actions/post_actions";
import { openModal } from "../../actions/modal_actions";
import { connect } from "react-redux";

//     handleSubmit(e){
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append('post[content]', this.state.content);
//         formData.append('post[user_id]', this.state.userId);
//         if (e.target[1].files[0]) formData.append('post[photo]', e.target[1].files[0]);
//         $.ajax({
//             url: 'api/posts',
//             method: "POST",
//             data: formData,
//             contentType: false,
//             processData: false
//         }).then(() => {
//             this.setState({
//                 content: ""
//             });
//             this.props.fetchPosts().then(posts => {
//                 this.setState({posts: posts.posts})
//             });
//         });
//         this.closeModal();
//     };
//                 {/* <div id="gray-screen" className="invisible" onClick={this.closeModal}></div>
//                 <div id="posts-modal" className="invisible">
//                     <div className="create-post">
//                         <div></div>
//                         <h1>Create post</h1>
//                         <div onClick={this.closeModal}>X</div>
//                     </div>
//                     <div>
//                         <img src={this.props.profilePhoto} alt="profile photo" onClick={this.goToProfilePage}/>
//                         <p onClick={this.goToProfilePage}>{this.props.firstName} {this.props.lastName}</p>
//                     </div>
//                     <form onSubmit={this.handleSubmit}>
//                         <textarea value={this.state.content} onChange={this.handleUpdate('content')} placeholder={`What's on your mind, ${this.props.firstName}?`}></textarea>
//                         <label htmlFor="create-post-file">Add image to your post</label>
//                         <input type="file" onChange={e => {this.setState({file: e.target.files})}} className="invisible" id="create-post-file"/>
//                         <button type="submit">Post</button>
//                     </form> */}
//                 {/* </div> */}

const Newsfeed = props => {
    const {userId, profilePhoto, firstName, fetchPosts, openModal} = props;

    const [state, setState] = useState({
        content: "",
        userId: userId,
        posts: {},
        rerender: 0
    });

    useEffect(() => {
        console.log("DEODJ")
        fetchPosts()
            .then(posts => {
                setState({
                    ...state,
                    posts: posts.posts
                });
            });
    }, []);

    const rerenderNewsfeed = () => {
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
                    onClick={() => openModal("makePosts")}
                    readOnly={state.content}
                />
            </div>

            <div className="all-posts">
                {Object.values(state.posts).map(post => (
                    <PostItem
                        post={post}
                        key={post.id}
                        rerenderNewsfeed={rerenderNewsfeed}
                    />
                ))}
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    const userId = state.session.id;
    const currentUserInfo = state.entities.users[userId]
    return({
        userId,
        profilePhoto: currentUserInfo.profilePhoto,
        firstName: currentUserInfo.firstName
    });
};

const mapDispatchToProps = dispatch => ({
    fetchPosts: () => dispatch(fetchPosts()),
    openModal: modal => dispatch(openModal(modal))
});

export default connect(mapStateToProps, mapDispatchToProps)(Newsfeed);