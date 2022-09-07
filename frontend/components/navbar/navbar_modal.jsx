import React from "react";
import { useHistory } from "react-router-dom";
import { closeNavbar } from "../../actions/modal_actions";
import { connect } from "react-redux";
import { logout } from "../../actions/session_actions";

const NavBarModal = props => {
    const { currentUserId, profilePhoto, firstName, lastName, logout, 
    closeNavbar} = props;

    let history = useHistory();

    const goToProfilePage = () => {
        history.push(`/users/${currentUserId}`);
        closeNavbar();
    };

    const openExternalSite = site => {
        window.open(site);
    };

    const completeLogout = () => {
        logout();
        closeNavbar();
    };

    return(
        <div className="navbar-modal">
            <div>
                <div className="navbar-modal-name" onClick={goToProfilePage}>
                    <div id="profile-image" className="square">                        
                        <img src={profilePhoto} alt="profile photo" />
                    </div>

                    <p>{firstName} {lastName}</p>
                </div>

                <hr />

                <p onClick={() => openExternalSite("https://www.facebook.com/")}>Visit the real Facebook!</p>
            </div>

            <div className="fake-links" onClick={() => openExternalSite("https://github.com/jzhou45/Metabook")}>
                <span>Metabook's GitHub</span>
            </div>

            <div className="fake-links" onClick={() => openExternalSite("https://www.linkedin.com/in/jonathanzhou77/")}>
                <span>Developer's LinkedIn</span>
            </div>

            <div className="fake-links" onClick={() => openExternalSite("https://angel.co/u/jonathan-zhou-5")}>
                <span>Developer's AngelList</span>
            </div>

            <div className="fake-links" onClick={() => openExternalSite("mailto:jonathanzhou77@gmail.com")}>
                <span>Email the developer</span>
            </div>

            <div onClick={completeLogout} className="fake-links" id="logout">
                <span>Log Out</span>
            </div>

            <div className="fake-text">
                <span>No privacy</span> · 
                <span> No terms</span> · 
                <span> No advertising</span> · 
                <span> No cookies</span> · 
                <span> No more</span> · 
                <span> Metabook 2022</span>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    const currentUserId = state.session.id;
    const currentUser = state.entities.users[currentUserId];
    return({
        currentUserId,
        profilePhoto: currentUser.profilePhoto,
        firstName: currentUser.first_name,
        lastName: currentUser.last_name
    });
};

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
    closeNavbar: () => dispatch(closeNavbar())
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBarModal);