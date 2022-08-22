import React from "react";

class Profile extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.fetchUser(this.props.usersId).then(
            () => {
                document.getElementById("user-name").innerHTML = this.props.users.first_name + " " + this.props.users.last_name;
            })
    }

    render(){
        return(
            <div>
                <div id="profile-header">
                    <div id="cover-photo">
                        <img src={this.props.users.coverPhoto} alt="cover photo" />
                    </div>
                    <div id="profile-photo">
                        <img src={this.props.users.profilePhoto} alt="profile photo" />
                        <h1 id="user-name"></h1>
                    </div>
                </div>
            </div>
        )
    }
};

export default Profile;