import React from "react";
import { Link } from "react-router-dom";

const Comment = props => {
    const {profilePhoto, firstName, lastName, comment} = props;

    return(
        <div className="comment-item">
            <Link to={`users/${comment.user_id}`}>
                <img 
                    src={profilePhoto} 
                    alt="profile photo" 
                    className="comment-profile-photo"
                />
            </Link>

            <div className="comment-box">
                <Link to={`users/${comment.user_id}`} className="comment-name">{firstName} {lastName}</Link>
                <p>{comment.comment}</p>
            </div>
        </div>
    );
};

export default Comment;