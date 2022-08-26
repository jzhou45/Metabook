import React from "react";

class NavBarModal extends React.Component{
    constructor(props){
        super(props);

        this.logout = this.logout.bind(this);
        this.goToProfilePage = this.goToProfilePage.bind(this);
    };

    componentDidMount(){
        document.getElementById("navbar-modal").style.display = "none";
    }

    logout(){
        this.props.logout();
    };

    goToProfilePage(){
        this.props.history.push(`/users/${this.props.currentUser}`);
        document.getElementById("navbar-modal").style.display = "none";
        this.props.closeNavbar();
    }

    goToGithub(){
        window.open("https://github.com/jzhou45/Metabook", '_blank');
    };

    goToLinkedIn(){
        window.open("https://www.linkedin.com/in/jonathanzhou77/", "_blank");
    };

    goToFacebook(){
        window.open("https://www.facebook.com", "_blank");
    };

    goToEmail(){
        window.open('mailto:jonathanzhou77@gmail.com', "_blank");
    };

    surpriseMe(){
        window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley', '_blank');
    };

    render(){
        return(
            <div id="navbar-modal">
                <div>
                    <div onClick={this.goToProfilePage} id="navbar-modal-name">
                        <div id="profile-image" className="square">
                            <img src={this.props.profilePhoto} alt="profile Photo" />
                        </div>
                        <p>
                            {this.props.firstName} {this.props.lastName}
                        </p>
                    </div>
                    <hr />
                    <p onClick={this.surpriseMe}>Surprise me!</p>
                </div>

                <div className="fake-links" onClick={this.goToGithub}>
                    <span>Metabook's GitHub</span>
                </div>

                <div className="fake-links" onClick={this.goToLinkedIn}>
                    <span>Developer's LinkedIn</span>
                </div>

                <div className="fake-links" onClick={this.goToEmail}>
                    <span>Email the developer</span>
                </div>

                <div className="fake-links" onClick={this.goToFacebook}>
                    <span>Visit the real Facebook</span>
                </div>

                <div onClick={this.props.logout} className="fake-links" id="logout">
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
        )
    };
};

export default NavBarModal;