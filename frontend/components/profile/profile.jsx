import React from "react";

class Profile extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.fetchUser(this.props.usersId).then(
            () => {
                document.getElementById("test").innerHTML = this.props.users.first_name + " " + this.props.users.last_name;
            })
    }

    render(){
        return(
            <div>
                <h1>Profile is working</h1>
                <h1 id="test"></h1>
                <button

                 onClick={() => {document.getElementById("test").innerHTML = this.props.users.first_name}}>
                </button>
            </div>
        )
    }
};

export default Profile;