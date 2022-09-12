import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Reply = props => {
    const {reply, fetchUser, replierId} = props

    const [state, setState] = useState({
        profilePhoto: "",
        firstName: "",
        lastName: ""
    });

    useEffect(() => {
        fetchUser(replierId).then(data => {
            setState({
                ...state,
                profilePhoto: data.user.profilePhoto,
                firstName: data.user.first_name,
                lastName: data.user.last_name
            });
        });
    }, []);

    return(
        <div className="reply">
            <div className="reply-header">
                <Link to={`users/${replierId}`}>
                    <img 
                        src={state.profilePhoto}
                        alt="profile photo" 
                        className="reply-profile-photo"
                    />
                </Link>
            </div>

            <div className="reply-body">
                <Link to={`users/${replierId}`}>{state.firstName} {state.lastName}</Link>
                {reply}
            </div>
        </div>
    );
};

export default Reply;