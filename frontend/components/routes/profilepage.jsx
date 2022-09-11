import React from "react";
import NavBar from "../navbar/navbar";
import AboutMe from "../profile/about_me";
import Profile from "../profile/profile";
import ProfilePosts from "../profile/profile_posts_container";

class ProfilePage extends React.Component{
    constructor(props){
        super(props);
    };

    render(){
        return(
            <div>
                <NavBar history={this.props.history} />
                <Profile location={this.props.location} history={this.props.history}/>
                <AboutMe location={this.props.location} history={this.props.history}/>
                <ProfilePosts location={this.props.location} history={this.props} />
            </div>
        );
    };
};

export default ProfilePage;