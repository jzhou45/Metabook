import React from "react";

class Profile extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            id: this.props.id,
            aboutMe: this.props.about_me,
            email: this.props.email,
            coverPhoto: this.props.coverPhoto,
            profilePhoto: this.props.profilePhoto,
            firstName: this.props.first_name,
            lastName: this.props.last_name
        };

        this.handleSubmitProfilePhoto = this.handleSubmitProfilePhoto.bind(this);
    }

    handleSubmitProfilePhoto(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append('user[profile_photo]', e.target.files[0]);

        $.ajax({
            url: `api/users/${this.state.id}`,
            method: 'PATCH',
            data: formData,
            contentType: false,
            processData: false
        }).then(() => {location.reload()});
    }

    render(){
        return(
            <div>
                <div id="profile-header">
                    <div id="cover-photo">
                        <img src={this.state.coverPhoto} alt="cover photo" />
                    </div>
                    <input type="file" onChange={this.handleSubmitProfilePhoto} id="profile-photo-input"/>
                    <div id="profile-photo">
                        <img src={this.state.profilePhoto} alt="profile photo"/>
                        <h1 id="user-name">{this.state.firstName} {this.state.lastName}</h1>
                    </div>
                </div>
            </div>
        )
    }
};

export default Profile;