import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Comment from "./comment_item";

const PostItem = props => {
    const {post, rerenderParent, fetchUser, currentUserId, fetchPost,
    profilePhoto} = props;

    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        profilePhoto: "",
        userId: "",
        editingPost: false,
        comment: "",
        comments: [],
        replies: []
    });

    useEffect(() => {
        fetchUser(post.user_id).then(data => {
            setState({
                ...state,
                firstName: data.user.first_name,
                lastName: data.user.last_name,
                profilePhoto: data.user.profilePhoto,
                userId: data.user.id,
                content: post.content,
                previousContent: post.content,
                comments: post.comments,
                replies: post.comments.comments
            });
        });
    }, []);

    const handleClickEdit = () => {
        setState({
            ...state,
            editingPost: true
        });
    };

    const handleClickDelete = () => {
        $.ajax({
            method: "DELETE",
            url: `api/posts/${post.id}`
        }).then(() => {
            rerenderParent();
        });
    };

    const handleClickCancel = () => {
        setState({
            ...state,
            content: state.previousContent,
            editingPost: false
        });
    };

    const handleUpdate = field => (
        e => setState({
            ...state,
            [field]: e.currentTarget.value
        })
    );

    const handleSubmit = e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('post[content]', state.content);
        $.ajax({
            method: "PATCH",
            url: `api/posts/${post.id}`,
            data: formData,
            contentType: false,
            processData: false
        }).then(() => 
            fetchPost(post.id)
        ).then(() =>
            setState({
                ...state,
                editingPost: false
            })
        );
    };

    const createComment = e => {
        e.preventDefault();
        const commentData = new FormData();
        commentData.append("comment[comment]", state.comment);
        commentData.append("comment[user_id]", currentUserId);
        commentData.append("comment[commentable_id]", post.id);
        commentData.append("comment[commentable_type]", "Post");
        $.ajax({
            method: "POST",
            url: "api/comments",
            data: commentData,
            contentType: false,
            processData: false
        }).then(() => {
            fetchPost(post.id).then(data => {
                setState({
                    ...state,
                    comments: data.post.comments,
                    comment: ""
                });
            });
        });
    };

    const commentAmount = () => {
        if (state.comments.length === 0){
            return "";
        } else if (state.comments.length === 1){
            return "1 Comment";
        } else{
            return `${state.comments.length} Comments`;
        };
    };

    return(
        <div id={`post-content${post.id}`} className="post-content">
            <div className="post-header">
                <div>
                    <Link to={`/users/${state.userId}`} className="post-links">
                        <img src={state.profilePhoto} alt="profile photo of poster" />
                    </Link>

                    <Link to={`/users/${state.userId}`} className="post-links">
                        <span>{state.firstName} {state.lastName}</span>
                    </Link>
                </div>

                {(currentUserId === post.user_id) ?
                    (<div className="edit-delete-post"> 
                        <div onClick={handleClickEdit}>
                            <img 
                                src="https://cdn0.iconfinder.com/data/icons/outline-icons/320/Pen-512.png" 
                                alt="edit" 
                            />
                        </div>

                        <div onClick={handleClickDelete}>
                            <img 
                                src="https://icons-for-free.com/iconfiles/png/512/delete+remove+trash+trash+bin+trash+can+icon-1320073117929397588.png" 
                                alt="delete"
                            />
                        </div>
                    </div>) : null
                }
            </div>

            {(state.editingPost) ?
                (<form onSubmit={handleSubmit}>
                    <textarea
                        value={state.content}
                        onChange={handleUpdate("content")}
                        placeholder="Post can't be blank!"
                    ></textarea>

                    <div>
                        <button onClick={handleClickCancel}>Cancel</button>
                        <button type="submit">Save</button>
                    </div>
                </form>) :
                (
                <div className="post-content">
                    <p>{state.content}</p>
                </div>
                )
            }

            {(props.post.photo) ?
                <img
                    src={post.photo}
                    className="post-images"
                /> : null
            }

            <div className="like-and-comment-amount">
                <div className="like-amount"></div>
                <div className="comment-amount">{commentAmount()}</div>
            </div>

            <div className="all-comments">
                {state.comments.map((comment, i) => {
                    if (comment.commentable_type === "Post"){
                        return(
                            <Comment 
                                key={i}
                                comment={comment}
                                fetchUser={fetchUser}
                                currentUserId={currentUserId}
                                profilePhoto={profilePhoto}
                            />
                        );
                    };
                })}
            </div>

            <div className="create-comment">
                <Link to={`users/${currentUserId}`}>
                    <img 
                        src={profilePhoto}
                        alt="profile photo"
                        className="create-comment-photo"
                    />
                </Link>
                <form onSubmit={createComment}>
                    <input 
                        type="text"
                        value={state.comment}
                        onChange={handleUpdate("comment")}
                        placeholder="Write a comment..."
                        />
                </form>
            </div>
        </div>
    );
};

export default PostItem;