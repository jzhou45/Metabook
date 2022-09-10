import React, { useState, useEffect } from "react";
import { fetchUser } from "../../actions/user_actions";
import { connect } from "react-redux";

const Profile = props => {
    const { usersId, currentUserId, fetchUser } = props;

    const [state, setState] = useState({
        id: "",
        aboutMe: "",
        email: "",
        coverPhoto: "", 
        profilePhoto: "",
        firstName: "",
        lastName: ""
    });

    useEffect(() => {
        fetchUser(usersId).then(data => {
            setState({
                ...state,
                id: data.user.id,
                aboutMe: data.user.about_me,
                email: data.user.email,
                coverPhoto: data.user.coverPhoto,
                profilePhoto: data.user.profilePhoto,
                firstName: data.user.first_name,
                lastName: data.user.last_name
            });
        });
    });

    const handleSubmitProfilePhoto = e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("user[profile_photo]", e.target.files[0]);

        $.ajax({
            url: `api/users/${state.id}`,
            method: "PATCH",
            data: formData,
            contentType: false,
            processData: false
        });
    };

    const handleSubmitCoverPhoto = e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("user[cover_photo]", e.target.files[0]);

        $.ajax({
            url: `api/users/${state.id}`,
            method: "PATCH",
            data: formData,
            contentType: false,
            processData: false
        });
    };

    return(
        <div>
            <div className="profile-header">
                <div className="cover-photo">
                    <img src={state.coverPhoto} alt="cover photo" />

                    {(currentUserId === usersId) ?
                        (<div className="cover-photo-change">
                            <input 
                                type="file"
                                id="cover-photo-input"
                                onChange={handleSubmitCoverPhoto}
                            />
                            <label htmlFor="cover-photo-input">Edit cover photo</label>
                        </div>) : 
                    null}
                </div>

                <div className="profile-photo">
                    <div>
                        <img src={state.profilePhoto} alt="profile photo" />
                        {(currentUserId === usersId) ?
                            (<div className="profile-photo-change">
                                <input 
                                    type="file"
                                    id="profile-photo-input"
                                    onChange={handleSubmitProfilePhoto}
                                />
                                <label htmlFor="profile-photo-change">
                                    <img 
                                        src="https://cdn-icons-png.flaticon.com/512/83/83574.png" 
                                        alt="change profile photo" 
                                    />
                                </label>
                            </div>) : 
                        null}
                    </div>
                    <h1 className="user-name">{state.firstName} {state.lastName}</h1>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    const usersId = parseInt(ownProps.location.pathname.split("/")[2]);
    return ({
        usersId,
        currentUserId: state.session.id
    });
};

const mapDispatchToProps = dispatch => ({
    fetchUser: userId => dispatch(fetchUser(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);