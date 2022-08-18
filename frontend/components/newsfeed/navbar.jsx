import React from "react";

class NavBar extends React.Component{
    constructor(props){
        super(props);
        this.logout = this.logout.bind(this);
        document.body.style.backgroundColor = "#1c1e21";
    }

    logout(){
        this.props.logout();
    }

    render(){
        return(
            <header id="navbar">
                <h1>metabook</h1>
                <input type="text" id="search-bar" placeholder="Search Metabook"/>
                <div>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/LinkedIn_icon_circle.svg/2048px-LinkedIn_icon_circle.svg.png" alt="linkedin link" />
                    <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="github link" />
                    <button onClick={this.logout}>Logout</button>
                </div>
            </header>
        )
    }
}

export default NavBar;