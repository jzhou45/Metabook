import React from "react";

class LoginForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            loggedIn: false,
            first_name: '',
            last_name: '',
            birthday: '',
            gender: ''
        };
        document.getElementsByTagName("html")[0].style.backgroundColor = "#eff2f5";
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.logout = this.logout.bind(this);
        this.openModal = this.openModal.bind(this);
        this.loginAsDemoUser = this.loginAsDemoUser.bind(this);
        this.handleErrors = this.handleErrors.bind(this);
    }

    handleUpdate(field){
        return e => this.setState({[field]: e.currentTarget.value});
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.login(this.state);
        if (store.getState().session.id) this.setState({loggedIn: true});
        this.handleErrors();
    }

    logout(){
        this.props.logout();
        this.setState({loggedIn: false});
    }

    openModal(){
        this.props.openModal("modal");
        const modal = document.getElementById("modal");
        modal.classList.remove("invisible");
        modal.classList.add("openModal");
        const whiteBackground = document.getElementById("white-background");
        whiteBackground.classList.remove("invisible");
        whiteBackground.classList.add("white-background");
    }

    loginAsDemoUser(){
        this.props.login({email:"demouser@email.com", password: "password"});
        this.setState({loggedIn:true});
    }

    handleErrors(){
        if (this.state.email.length === 0){
            document.getElementById("login-email").style.border = "1px solid #f02849";
            document.getElementById("login-email-error-message").innerHTML = "The email you entered isn't connected to an account.";
            document.getElementById("login-container").firstChild.style.height = "420px";
        }
        if (this.state.password.length === 0){
            document.getElementById("login-password").style.border = "1px solid #f02849";
            document.getElementById("login-password-error-message").innerHTML = "The password you've entered is incorrect";
            document.getElementById("login-container").firstChild.style.height = "420px";
        }
    }

    render(){
        if (!this.props.sessionid){
            return(
                <div id="login-signup-forms" className="invisible">
                    <div id="white-background"></div>

                    <div id="greetings">
                        <h1>metabook</h1>
                        <h2>Connect with friends and the world around you on Metabook.</h2>
                    </div>

                    <div id="login-container">
                        <form onSubmit={this.handleSubmit}>
                            <input type="text" name="email" value={this.state.email} onChange={this.handleUpdate('email')} id="login-email" placeholder="Email" />
                            <p id="login-email-error-message" className="login-errors"></p>
                            <input type="password" name="password" value={this.state.password} onChange={this.handleUpdate('password')} id="login-password" placeholder="Password" />
                            <p id="login-password-error-message" className="login-errors"></p>

                            <button type="submit" className="login-button">Log In</button>

                            <div id="demo-login" onClick={this.loginAsDemoUser}>Login as Demo User?</div>

                            <hr />
                            <div onClick={this.openModal} className="signup-button">
                                <p>Create new account</p>
                            </div>
                        </form>
                        <div className="create-a-page">
                            <p><span>Create a Page </span> for a celebrity, brand or business.</p>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default LoginForm;