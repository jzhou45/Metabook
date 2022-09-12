import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Comment = props => {
    const {fetchUser, comment} = props;

    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        profilePhoto: ""
    });

    useEffect(() => {
        fetchUser(comment.user_id).then(data => {
            setState({
                ...state,
                profilePhoto: data.user.profilePhoto,
                firstName: data.user.first_name,
                lastName: data.user.last_name
            });
        });
    }, []);

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
        </div>
    );
};

export default Comment;