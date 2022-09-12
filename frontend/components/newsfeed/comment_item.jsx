import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchComment } from "../../actions/comment_actions"

const Comment = props => {
    const {fetchUser, comment, currentUserId, fetchComment} = props;

    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        profilePhoto: "",
        comment: "",
        comments: [],
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

    const rerenderParentComment = () => {
        fetchComment(comment.id)
    };

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
                });
            });
        });
    }

    return(
        <div className="comment-item">
            <Link to={`users/${comment.user_id}`}>
                <img 
                    src={state.profilePhoto} 
                    alt="profile photo" 
                    className="comment-profile-photo"
                />
            </Link>

            <div className="comment-box">
                <Link to={`users/${comment.user_id}`} className="comment-name">{state.firstName} {state.lastName}</Link>
                <p>{comment.comment}</p>
            </div>

            <div className="replies-box">

                {(state.comments.map((reply, i) => (
                    <div key={i}>{reply.comment}</div>
                )))}

                <form onSubmit={handleSubmit}>
                    <input type="text" value={state.comment} onChange={handleUpdate("comment")} />
                    <button type="submit"></button>
                </form>
            </div>

            <button onClick={() => console.log(state)}>STATE</button>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    fetchComment: commentId => dispatch(fetchComment(commentId))
});

export default connect(null, mapDispatchToProps)(Comment);