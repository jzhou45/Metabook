import React, { useState, useEffect } from "react";

const Reply = props => {
    const {reply, fetchUser, replierId, commentObj, rerenderParent, currentUserId,
    openReply, fetchComment, history} = props

    const [state, setState] = useState({
        profilePhoto: "",
        firstName: "",
        lastName: "",
        dropdown: false,
        editing: false,
        comment: reply,
        previousComment: reply,
        likes: []
    });

    const fetchData = async () => {
        const userData = await fetchUser(commentObj.user_id);
        const commentData = await fetchComment(commentObj.id);

        setState({
            ...state,
            profilePhoto: userData.user.profilePhoto,
            firstName: userData.user.first_name,
            lastName: userData.user.last_name,
            likes: commentData.comment.likes
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleClick = () => {
        (state.dropdown) ? (setState({...state, dropdown: false})) : (setState({...state, dropdown: true}));
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
            url: `api/comments/${commentObj.id}`,
            data: commentData,
            contentType: false,
            processData: false
        }).then(() => {
            setState({
                ...state,
                editing: false
            });
            
            rerenderParent();
        });
    };

    const handleUpdate = field => (
        e => setState({
            ...state,
            [field]: e.currentTarget.value
        })
    );

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
            url: `api/comments/${commentObj.id}`,
        }).then(() => {
            rerenderParent();
        });
    };

    const likeComment = () => {
        const likeData = new FormData();
        likeData.append("like[user_id]", currentUserId);
        likeData.append("like[likeable_id]", commentObj.id);
        likeData.append("like[likeable_type]", "Comment");

        $.ajax({
            method: "POST",
            url: "api/likes",
            data: likeData,
            contentType: false,
            processData: false
        }).then(() => {
            fetchComment(commentObj.id).then(data => {
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
            fetchComment(commentObj.id).then(data => {
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

    return(
        <div className="reply">
            <div className="reply-top-half">
                <div className="reply-header">
                    <div onClick={() => goToProfile(replierId)} className="reply-header-image">
                        <img 
                            src={state.profilePhoto}
                            alt="profile photo" 
                            className="reply-profile-photo"
                        />
                    </div>
                </div>

                <div className="reply-align">
                    <div>
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

                            (<div className="reply-body">
                                <div 
                                    onClick={() => goToProfile(replierId)} 
                                    className="reply-body-name"
                                >
                                    {state.firstName} {state.lastName}
                                </div>

                                <div className="comment-text">{reply}
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
                    </div>

                    {(commentObj.user_id === currentUserId) ? 

                        (<div className="comments-dropdown-div" onClick={handleClick}>
                            <img 
                                src="https://miro.medium.com/max/512/1*Js0Y20MwjcTnVAe7KjDXNg.png" 
                                alt="open comment dropdown" 
                                className="comments-dropdown"
                                />
                        </div>) :

                    null}

                </div>
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

            <div className="like-and-comments-div">
                <span className={commentLike()} onClick={handleLikes}>Like</span>
                <span onClick={openReply} className="open-reply">Reply</span>
            </div>

        </div>


    );
};

export default Reply;