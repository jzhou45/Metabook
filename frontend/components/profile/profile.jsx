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
                        <img src="https://swall.teahub.io/photos/small/51-512779_dream-imagine-believe-facebook-cover.jpg" alt="cover photo" />
                    </div>
                    <div id="profile-photo">
                        <img src="https://s167.daydaynews.cc/?url=http%3A%2F%2Fp1.pstatp.com%2Flarge%2Fpgc-image%2F82530511de2a45dfadee9614bb407187" alt="profile photo" />
                        <h1 id="user-name"></h1>
                    </div>
                </div>
            </div>
        )
    }
};

export default Profile;