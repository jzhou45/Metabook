import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { openNavbar, closeNavbar } from "../../actions/modal_actions";
import SearchBar from "./searchbar";

const NavBar = props => {
    document.documentElement.style.backgroundColor = "#1c1e21"

    const {profilePhoto, navbar, openNavbar, closeNavbar} = props;

    const modalControls = () => {
        if (navbar.type === "navbar"){
            closeNavbar();
        } else{
            openNavbar();
        };
    };

    const openExternalSite = site => {
        window.open(site);
    };

    return(
        <div className="navbar">
            <Link to="/" className="navbar-home">
                <h1>metabook</h1>
            </Link>

            <SearchBar />

            <div>
                <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/LinkedIn_icon_circle.svg/2048px-LinkedIn_icon_circle.svg.png" 
                    alt="linkedin"
                    onClick={() => openExternalSite("https://www.linkedin.com/in/jonathanzhou77/")}
                />

                <img 
                    src="https://cdn-icons-png.flaticon.com/512/25/25231.png" 
                    alt="github"  
                    onClick={() => openExternalSite("https://github.com/jzhou45/Metabook")}
                />

                <img 
                    src="https://cdn1.iconfinder.com/data/icons/logos-and-brands-3/512/20_Angellist_logo_logos-512.png" 
                    alt="angellist"
                    className="angellist"
                    onClick={() => openExternalSite("https://angel.co/u/jonathan-zhou-5")}
                />

                <div className="profile-button" onClick={modalControls}>
                    <img src={profilePhoto} alt="profile photo" />
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    const currentUserId = state.session.id;
    return({
        profilePhoto: state.entities.users[currentUserId].profilePhoto,
        navbar: state.ui.modal
    });
};

const mapDispatchToProps = dispatch =>({
    openNavbar: () => dispatch(openNavbar()),
    closeNavbar: () => dispatch(closeNavbar())
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);