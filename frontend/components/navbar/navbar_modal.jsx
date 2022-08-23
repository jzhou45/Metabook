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
        this.props.history.push(`/users/${this.props.currentUser.id}`);
    }

    render(){
        return(
            <div id="navbar-modal">
                <div>
                    <div onClick={this.goToProfilePage} id="navbar-modal-name">
                        <div id="profile-image" className="square">
                            <span> {this.props.currentUser.first_name[0]} {this.props.currentUser.last_name[0]}</span>
                        </div>
                        <p>
                            {this.props.currentUser.first_name} {this.props.currentUser.last_name}
                        </p>
                    </div>
                    <hr />
                    <p>See all profiles</p>
                </div>

                <div className="fake-links">
                    <span>Settings & privacy</span>
                </div>

                <div className="fake-links">
                    <span>Help & support</span>
                </div>

                <div className="fake-links">
                    <span>Display & accessibility</span>
                </div>

                <div className="fake-links">
                    <span>Give feedback</span>
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