import React, { useState } from "react";
import { closeModal } from "../../actions/modal_actions";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const NewsfeedModal = props => {
    const {closeModal, profilePhoto, userId, firstName, lastName} = props;

    const [state, setState] = useState({
        content: "",
        userId,
    });

    const handleUpdate = field => (
        e => setState({
            ...state,
            [field]: e.currentTarget.value
        })
    );

    const handleSubmit = e => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("post[content]", state.content);
        formData.append("post[user_id]", state.userId);
        if (e.target[1].files[0]){
            formData.append("post[photo]", e.target[1].files[0]);
        };

        $.ajax({
            url: "api/posts",
            method: "POST",
            data: formData,
            contentType: false,
            processData: false
        }).then(() => {
            setState({
                content: ""
            });
        });
        closeModal();
    }

    return(
        <div className="posts-modal">
            <div className="create-post">
                <div></div>
                <h1>Create post</h1>
                <div onClick={() => closeModal()}>X</div>
            </div>

            <div>
                <Link to={`/users/${userId}`}>
                    <img 
                        src={profilePhoto} 
                        alt="profile photo" 
                        className="posts-profile-photo"
                    />
                </Link>
                <Link to={`/users/${userId}`} className="posts-link">
                    <p>{firstName} {lastName}</p>
                </Link>
            </div>

            <form onSubmit={handleSubmit}>
                <textarea
                    value={state.content}
                    onChange={handleUpdate("content")}
                    placeholder={`What's on your mind, ${firstName}?`}
                ></textarea>
                <label htmlFor="create-post-file">Add image to your post</label>
                <input 
                    type="file"
                    onChange={e => setState({
                        file: e.target.files
                    })}
                    id="cerate-post-file"
                />
            </form>
        </div>
    );
};

const mapStateToProps = state => {
    const userId = state.session.id;
    const currentUserInfo = state.entities.users[userId];
    return {
        userId,
        profilePhoto: currentUserInfo.profilePhoto,
        firstName: currentUserInfo.first_name,
        lastName: currentUserInfo.last_name
    };
};

const mapDispatchToProps = dispatch => ({
    closeModal: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsfeedModal);