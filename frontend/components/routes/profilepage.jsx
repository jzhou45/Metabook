import React, { useState } from "react";
import NavBar from "../navbar/navbar";
import AboutMe from "../profile/about_me";
import Profile from "../profile/profile";
import ProfilePosts from "../profile/profile_posts";

const ProfilePage = props => {
    const {history, location} = props;

    const [state, setState] = useState({
        prevPathname: history.location.pathname
    });

    const resetPrevPathname = pathname => {
        setState({
            prevPathname: pathname
        });
    };

    return (
        <div>
            <NavBar history={history} />
            <Profile location={location} history={history} prevPathname={state.prevPathname} resetPrevPathname={resetPrevPathname}/>
            <AboutMe location={location} history={history} prevPathname={state.prevPathname} resetPrevPathname={resetPrevPathname}/>
            <ProfilePosts location={location} history={history} prevPathname={state.prevPathname} resetPrevPathname={resetPrevPathname}/>
        </div>
    );
};

export default ProfilePage;