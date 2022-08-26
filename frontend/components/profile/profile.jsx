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
        this.handleSubmitCoverPhoto = this.handleSubmitCoverPhoto.bind(this);
    }

    componentDidMount(){
        this.props.fetchUser(this.props.usersId).then(user => {
            this.setState({
                aboutMe: user.user.about_me,
                email: user.user.email,
                coverPhoto: user.user.coverPhoto,
                profilePhoto: user.user.profilePhoto,
                firstName: user.user.first_name,
                lastName: user.user.last_name,
                id: user.user.id
            })
            console.log(this.state);
        })
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

    handleSubmitCoverPhoto(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append('user[cover_photo]', e.target.files[0]);

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
                        {(parseInt(location.href[location.href.length -1]) === this.props.currentUserId) ? 
                            <div id="cover-photo-change">
                                <input type="file" onChange={this.handleSubmitCoverPhoto} id="cover-photo-input" className="invisible"/>
                                <label htmlFor="cover-photo-input">Edit cover photo</label>
                            </div>
                             : null}
                    </div>
                    <div id="profile-photo">
                        <div>
                            <img src={this.state.profilePhoto} alt="profile photo"/>
                            {(parseInt(location.href[location.href.length -1]) === this.props.currentUserId) ? 
                            <div id="profile-photo-change">
                                <input type="file" onChange={this.handleSubmitProfilePhoto} id="profile-photo-input" className="invisible"/>
                                <label htmlFor="profile-photo-input"><img src="https://cdn-icons-png.flaticon.com/512/83/83574.png" alt="Change Profile Picture" /></label>
                            </div>
                             : null}
                        </div>
                        <h1 id="user-name">{this.state.firstName} {this.state.lastName}</h1>
                    </div>
                </div>
            </div>
        )
    }
};

export default Profile;