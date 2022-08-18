import React from "react";

class Profile extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        console.log(this.props);
    }

    render(){
        return(
            <div>
                <h1>Profile is working</h1>
            </div>
        )
    }
};

export default Profile;