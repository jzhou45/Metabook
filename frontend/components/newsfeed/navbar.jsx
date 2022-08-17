import React from "react";

class NavBar extends React.Component{
    constructor(props){
        super(props)
        this.logout = this.logout.bind(this);
    }

    logout(){
        this.props.logout();
    }

    render(){
        return(
            <button onClick={this.logout}>Logout</button>
        )
    }
}

export default NavBar;