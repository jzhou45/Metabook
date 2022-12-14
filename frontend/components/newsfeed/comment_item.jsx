import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchComment } from "../../actions/comment_actions"
import Reply from "./replies_item";
import Loading from "../loading/loading";

const Comment = props => {
    const {fetchUser, comment, currentUserId, fetchComment, profilePhoto, rerenderPost,
    history} = props;

    const [loading, setLoading] = useState(true);

    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        profilePhoto: "",
        comment: comment.comment,
        previousComment: comment.comment,
        newComment: "",
        comments: [],
        replying: false,
        dropdown: false,
        editing: false,
        likes: []
    });

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
        fetchData().then(() => setLoading(false));
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
        commentData.append("comment[comment]", state.newComment);
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
                    newComment: ""
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

    const handleEdit = () => {
        setState({
            ...state,
            dropdown: false,
            editing: true
        });
    };

    const handleSubmitEdit = e => {
        e.preventDefault();
        const commentData = new FormData();
        commentData.append("comment[comment]", state.comment);

        $.ajax({
            method: "PATCH",
            url: `api/comments/${comment.id}`,
            data: commentData,
            contentType: false,
            processData: false
        }).then(() => {
            setState({
                ...state,
                editing: false
            });
            rerenderPost();
        });
    };

    const cancelEdit = () => {
        setState({
            ...state,
            comment: state.previousComment,
            editing: false
        });
    };

    const handleDelete = e => {
        e.preventDefault();

        setState({
            ...state,
            dropdown: false
        });

        $.ajax({
            method: "DELETE",
            url: `api/comments/${comment.id}`,
        }).then(() => {
            rerenderPost();
        });
    };

    const likeComment = () => {
        const likeData = new FormData();
        likeData.append("like[user_id]", currentUserId);
        likeData.append("like[likeable_id]", comment.id);
        likeData.append("like[likeable_type]", "Comment");

        $.ajax({
            method: "POST",
            url: "api/likes",
            data: likeData,
            contentType: false,
            processData: false
        }).then(() => {
            fetchComment(comment.id).then(data => {
                setState({
                    ...state,
                    likes: data.comment.likes
                });
            });
        });
    };

    const unlike = likeId => {
        $.ajax({
            method: "DELETE",
            url: `api/likes/${likeId}`
        }).then(() => {
            fetchComment(comment.id).then(data => {
                setState({
                    ...state,
                    likes: data.comment.likes
                });
            });
        });
    };

    const handleLikes = () => {
        for (let like of state.likes){
            if (like.user_id === currentUserId){
                unlike(like.id);
                return;
            };
        };
        likeComment();
    };

    const likeAmount = () => {
        if (state.likes.length < 2){
            return "";
        } else {
            return state.likes.length;
        };
    };

    const commentLike = () => {
        for (let like of state.likes){
            if (like.user_id === currentUserId){
                return "comment-like comment-liked";
            };
        };
        return "comment-like";
    };

    const goToProfile = userId => {
        history.push(`/users/${userId}`);
    };

    const content = () => (
        <div className="comment-item">
            <div className="parent-comment">
                <div onClick={() => goToProfile(comment.user_id)}>
                    <img 
                        src={state.profilePhoto} 
                        alt="profile photo" 
                        className="comment-profile-photo"
                        />
                </div>
                
                <div className="comments-align">

                    {(state.editing) ?
                        (<form onSubmit={handleSubmitEdit}>
                            <input type="text" 
                                value={state.comment} 
                                onChange={handleUpdate("comment")}
                                autoFocus
                                onBlur={cancelEdit}
                                className="edit-reply"
                            />
                        </form>) : 

                        (<div className="comment-box">
                            <div onClick={() => goToProfile(comment.user_id)} className="comment-box-name">{state.firstName} {state.lastName}</div>
                            <div className="comment-text">{comment.comment}

                                {(state.likes.length > 0) ?
                                    (<div className="comment-like-icon">
                                        <img 
                                            src="https://i.pinimg.com/originals/39/44/6c/39446caa52f53369b92bc97253d2b2f1.png" 
                                            alt="like" 
                                        />
                                        <span>
                                            {likeAmount()}
                                        </span>
                                    </div>) :
                                null}
                            </div>


                        </div>)
                    }

                    {(comment.user_id === currentUserId) ? 

                        (<div className="comments-dropdown-div" onClick={handleClick}>
                            <img 
                                src="https://miro.medium.com/max/512/1*Js0Y20MwjcTnVAe7KjDXNg.png" 
                                alt="open comment dropdown" 
                                className="comments-dropdown"
                            />
                        </div>) :
                    null}

                    {(state.dropdown) ?
                        (<div className="invisible-background" onClick={handleClick}></div>) :
                    null}

                    {(state.dropdown) ?
                        (<div className="reply-dropdown-menu" tabIndex={0} onBlur={handleClick}>
                            <div onClick={handleEdit}>
                                <span>Edit</span>
                            </div>

                            <div onClick={handleDelete}>
                                <span>Delete</span>
                            </div>
                        </div>) :
                    null}

                </div>
            </div>        

            <div className="like-and-comments-div">
                <span className={commentLike()} onClick={handleLikes}>Like</span>
                <span onClick={openReply} className="open-reply">Reply</span>
            </div>

            <div className="replies-box">
                {(state.comments.map((reply, i) => {
                    return(
                        <Reply 
                            key={i} 
                            reply={reply.comment}
                            fetchUser={fetchUser}
                            replierId={reply.user_id}
                            commentObj={reply}
                            rerenderParent={rerenderParent}
                            currentUserId={currentUserId}
                            openReply={openReply}
                            fetchComment={fetchComment}
                            history={history}
                        />
                    );
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
                            value={state.newComment} 
                            onChange={handleUpdate("newComment")} 
                            placeholder="Write a reply..."
                            ref={replyRef}
                            autoFocus
                        />
                    </form>) :
                null}
            </div>
        </div>
    );

    return loading ? <Loading/> : content();
};

const mapDispatchToProps = dispatch => ({
    fetchComment: commentId => dispatch(fetchComment(commentId))
});

export default connect(null, mapDispatchToProps)(Comment);