import React from "react";

class Profile extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        console.log(this.props.fetchUser(this.props.usersId))
    }

    render(){
        return(
            <div>
                <h1>Profile is working</h1>
                <h2 id="test">fwfewf</h2>
            </div>
        )
    }
};

export default Profile;