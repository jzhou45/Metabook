import React from "react";

class NavBar extends React.Component{
    constructor(props){
        super(props);

        document.getElementsByTagName("html")[0].style.backgroundColor = "#1c1e21";

        this.modalControls = this.modalControls.bind(this);
        this.goToHomePage = this.goToHomePage.bind(this);
    };

    componentDidMount(){
        this.props.closeNavbar();
    }

    openLinkedIn(){
        window.open("https://www.linkedin.com/in/jonathanzhou77/");
    };

    openGithub(){
        window.open("https://github.com/jzhou45/Metabook");
    };

    modalControls(){
        if (this.props.navbar.navbar){
            this.closeModal();
        } else{
            this.openModal();
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
        this.closeModal();
    }

    render(){
        return(
            <header id="navbar">
                <h1 onClick={this.goToHomePage}>metabook</h1>
                <input type="text" id="search-bar" placeholder="Metabook"/>
                <div>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/LinkedIn_icon_circle.svg/2048px-LinkedIn_icon_circle.svg.png" alt="linkedin link" onClick={this.openLinkedIn} />
                    <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="github link" onClick={this.openGithub}/>
                    <div id="profile-button" className="square" onClick={this.modalControls}>
                        <img src={this.props.profilePhoto} alt="profile photo" />
                    </div>
                </div>
            </header>
        )
    };
};

export default NavBar;