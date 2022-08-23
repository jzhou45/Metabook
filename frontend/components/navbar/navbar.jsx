import React from "react";

class NavBar extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            modalOpened: false,
        };

        document.body.style.backgroundColor = "#1c1e21";

        this.modalControls = this.modalControls.bind(this);
        this.goToHomePage = this.goToHomePage.bind(this);
    };

    openLinkedIn(){
        window.open("https://www.linkedin.com/in/jonathanzhou77/");
    };

    openGithub(){
        window.open("https://github.com/jzhou45/Metabook");
    };

    modalControls(){
        if (this.state.modalOpened){
            this.setState({modalOpened: false});
            this.openModal();
        } else{
            this.setState({modalOpened: true});
            this.closeModal();
        };
    };

    openModal(){
        document.getElementById("navbar-modal").style.display = "flex";
        this.props.openNavbar();
    }

    closeModal(){
        document.getElementById("navbar-modal").style.display = "none";
        this.props.closeNavbar();
    }

    goToHomePage(){
        this.props.history.push("/");
    }

    render(){
        return(
            <header id="navbar">
                <h1 onClick={this.goToHomePage}>metabook</h1>
                <input type="text" id="search-bar" placeholder="Search Metabook"/>
                <div>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/LinkedIn_icon_circle.svg/2048px-LinkedIn_icon_circle.svg.png" alt="linkedin link" onClick={this.openLinkedIn} />
                    <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="github link" onClick={this.openGithub}/>
                    <div id="profile-button" className="square" onClick={this.modalControls}>
                        <span>
                            {this.props.currentUser.first_name[0]} {this.props.currentUser.last_name[0]}
                        </span>
                    </div>
                </div>
            </header>
        )
    };
};

export default NavBar;