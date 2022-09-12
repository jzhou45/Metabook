import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Reply = props => {
    const {reply, fetchUser, replierId, commentObj, rerenderParent} = props

    const [state, setState] = useState({
        profilePhoto: "",
        firstName: "",
        lastName: "",
        dropdown: false,
        editing: false,
        comment: reply,
        previousComment: reply
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

            <div className="reply-align">
                <div className="reply-body">
                    <Link to={`users/${replierId}`}>{state.firstName} {state.lastName}</Link>

                    {(state.editing) ?
                    
                    (<form onSubmit={handleSubmitEdit}>
                        <input type="text" 
                            value={state.comment} 
                            onChange={handleUpdate("comment")}
                            autoFocus
                            onBlur={cancelEdit}
                        />
                    </form>) : 
                    reply}

                </div>

                <div className="comments-dropdown-div" onClick={handleClick}>
                    <img 
                        src="https://miro.medium.com/max/512/1*Js0Y20MwjcTnVAe7KjDXNg.png" 
                        alt="open comment dropdown" 
                        className="comments-dropdown"
                        />
                </div>

                {(state.dropdown) ?
                    (<div className="invisible-background" onClick={handleClick}></div>) :
                null}

                {(state.dropdown) ?
                (<div className="reply-dropdown-menu" tabIndex={0} onBlur={handleClick}>
                    <span onClick={handleEdit}>Edit</span>
                    <span>Delete</span>
                </div>) :
                null}
            </div>
        </div>
    );
};

export default Reply;