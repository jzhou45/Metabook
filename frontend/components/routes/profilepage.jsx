import React from "react";
import NavBar from "../navbar/navbar";
import NavBarModal from "../navbar/navbar_modal_container";
import AboutMe from "../profile/about_me_container";
import Profile from "../profile/profile_container";
import ProfilePosts from "../profile/profile_posts_container";

class ProfilePage extends React.Component{
    constructor(props){
        super(props);
    };

    render(){
        return(
            <div>
                <NavBar history={this.props.history} />
                <NavBarModal history={this.props.history} />
                <Profile location={this.props.location} history={this.props.history}/>
                <AboutMe location={this.props.location} history={this.props.history}/>
                <ProfilePosts location={this.props.location} history={this.props} />
            </div>
        );
    };
};

export default ProfilePage;