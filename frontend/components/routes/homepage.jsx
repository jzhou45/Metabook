import React from "react";
import NavBar from "../navbar/navbar_container";
import NavBarModal from "../navbar/navbar_modal_container";
import Newsfeed from "../newsfeed/newsfeed_container";
import LoginForm from "../session/login_form_container";
import SignupForm from "../session/signup_form_container";

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
                        <NavBarModal history={this.props.history} />
                        <Newsfeed history={this.props.history} />
                    </div>) :
                    (<div>
                        <LoginForm />
                        <SignupForm />    
                    </div>)
                }
            </div>
        );
    };
};

export default HomePage;