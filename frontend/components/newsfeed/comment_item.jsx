import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchComment } from "../../actions/comment_actions"
import Reply from "./replies_item";

const Comment = props => {
    const {fetchUser, comment, currentUserId, fetchComment, profilePhoto} = props;

    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        profilePhoto: "",
        comment: "",
        comments: [],
        replying: false,
        dropdown: false
    });

    useEffect(() => {
        const fetchData = async () => {
            const userData = await fetchUser(comment.user_id);
            const commentData = await fetchComment(comment.id);

            setState({
                ...state,
                profilePhoto: userData.user.profilePhoto,
                firstName: userData.user.first_name,
                lastName: userData.user.last_name,
                comments: commentData.comment.comments
            });
        };

        fetchData();
    }, []);

    const handleUpdate = field => (
        e => setState({
            ...state,
            [field]: e.currentTarget.value
        })
    );

    const handleSubmit = e => {
        e.preventDefault();
        const commentData = new FormData();
        commentData.append("comment[comment]", state.comment);
        commentData.append("comment[user_id]", currentUserId);
        commentData.append("comment[commentable_id]", comment.id);
        commentData.append("comment[commentable_type]", "Comment");
        $.ajax({
            method: "POST",
            url: "api/comments",
            data: commentData,
            contentType: false,
            processData: false
        }).then(() => {
            fetchComment(comment.id).then(data => {
                setState({
                    ...state,
                    comments: data.comment.comments,
                    comment: ""
                });
            });
        });
    };

    const replyRef = useRef(null);

    const openReply = () => {
        setState({
            ...state,
            replying: true
        });
    };

    const handleClick = () => {
        (state.dropdown) ? (setState({...state, dropdown: false})) : (setState({...state, dropdown: true}));
    };

    const rerenderParent = () => {
        fetchComment(comment.id).then(data => {
            setState({
                ...state,
                comments: data.comment.comments
            });
        });
    };

    return(
        <div className="comment-item">
            <div className="parent-comment">
                <Link to={`users/${comment.user_id}`}>
                    <img 
                        src={state.profilePhoto} 
                        alt="profile photo" 
                        className="comment-profile-photo"
                        />
                </Link>
                
                <div className="comments-align">
                    <div className="comment-box">
                        <Link to={`users/${comment.user_id}`} className="comment-name">{state.firstName} {state.lastName}</Link>
                        <p>{comment.comment}</p>
                    </div>

                    <div className="comments-dropdown-div" onClick={handleClick}>
                        <img 
                            src="https://miro.medium.com/max/512/1*Js0Y20MwjcTnVAe7KjDXNg.png" 
                            alt="open comment dropdown" 
                            className="comments-dropdown"
                            />
                    </div>

                    {(state.dropdown) ?
                        (<div className="reply-dropdown-menu">
                            <span>Edit</span>
                            <span>Delete</span>
                        </div>) :
                    null}

                </div>
            </div>        

            <span onClick={openReply} className="open-reply">Reply</span>

            <div className="replies-box">
                {(state.comments.map((reply, i) => {
                    return(
                        <div>
                            <Reply 
                                key={i} 
                                reply={reply.comment}
                                fetchUser={fetchUser}
                                replierId={reply.user_id}
                                commentObj={reply}
                                rerenderParent={rerenderParent}
                                />

                            <span onClick={openReply} className="open-reply">Reply</span>
                        </div>);
                }))}

                {(state.replying) ?
                    (<form onSubmit={handleSubmit} className="reply-form">
                        <Link to={`users/${currentUserId}`}>
                            <img 
                                src={profilePhoto} 
                                alt="profile photo" 
                                />
                        </Link>
                        <input 
                            type="text" 
                            value={state.comment} 
                            onChange={handleUpdate("comment")} 
                            placeholder="Write a reply..."
                            ref={replyRef}
                            autoFocus
                        />
                    </form>) :
                null}
            </div>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    fetchComment: commentId => dispatch(fetchComment(commentId))
});

export default connect(null, mapDispatchToProps)(Comment);