import React from "react";

class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id: null,
            aboutMe: null,
            email: null,
            coverPhoto: null,
            profilePhoto: null,
            firstName: null,
            lastName: null
        };
    }

    componentDidMount(){
        this.props.fetchUser(this.props.usersId).then(
            (user) => {
                this.setState({
                    id: user.user.id,
                    email: user.user.email,
                    aboutMe: user.user.about_me,
                    firstName: user.user.first_name,
                    lastName: user.user.last_name,
                    profilePhoto: user.user.profilePhoto,
                    coverPhoto: user.user.coverPhoto
                })
                console.log(this.state)
                document.getElementById("user-name").innerHTML = this.state.firstName + " " + this.state.lastName;
            })
    }

    render(){
        return(
            <div>
                <div id="profile-header">
                    <div id="cover-photo">
                        <img src={this.state.coverPhoto} alt="cover photo" />
                    </div>
                    <div id="profile-photo">
                        <img src={this.state.profilePhoto} alt="profile photo" />
                        <h1 id="user-name"></h1>
                    </div>
                </div>
            </div>
        )
    }
};

export default Profile;