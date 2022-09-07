import React from "react";
import NavBar from "../navbar/navbar";
import Newsfeed from "../newsfeed/newsfeed";
import LoginForm from "../session/login_form";

class HomePage extends React.Component{
    constructor(props){
        super(props);
    };

    render(){
        return(
            <div>
                {(this.props.loggedIn) ? 
                    (<div>
                        <NavBar history={this.props.history} />
                        <Newsfeed history={this.props.history} />
                    </div>) :
                    (<div>
                        <LoginForm />
                    </div>)
                }
            </div>
        );
    };
};

export default HomePage;