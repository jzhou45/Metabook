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
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.logout = this.logout.bind(this);
        this.openModal = this.openModal.bind(this);
        this.loginAsDemoUser = this.loginAsDemoUser.bind(this);
    }

    handleUpdate(field){
        return e => this.setState({[field]: e.currentTarget.value});
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.login(this.state);
        if (store.getState().session.id) this.setState({loggedIn: true});
        
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

    componentDidUpdate(){
        if (!store.getState().session.id){
            const loginErrorsDiv = document.getElementById("login-errors");
            const sessionErrors = Object.values(store.getState().errors.session);
            let errorMessage = sessionErrors.join(" ");
            loginErrorsDiv.innerHTML = errorMessage;
            if (loginErrorsDiv.innerHTML !== ""){
                loginErrorsDiv.innerHTML += ".";
                document.getElementById("login-container").firstChild.style.height = "380px"
            };
        }
    }

    render(){
        if (!store.getState().session.id){
            return(
                <div id="login-signup-forms" className="invisible">
                    <div id="white-background"></div>

                    <div id="greetings">
                        <h1>metabook</h1>
                        <h2>Connect with friends and the world around you on Metabook.</h2>
                    </div>

                    <div id="login-container">
                        <form onSubmit={this.handleSubmit}>
                            <input type="email" name="email" value={this.state.email} onChange={this.handleUpdate('email')} placeholder="Email" required/>
                            <input type="password" name="password" value={this.state.password} onChange={this.handleUpdate('password')} placeholder="Password" required/>

                            <div id="login-errors"></div>

                            <button type="submit" className="login-button">Log In</button>

                            <div id="demo-login" onClick={this.loginAsDemoUser}>Login as Demo User?</div>

                            <hr />
                            <button onClick={this.openModal}>Create new account</button>
                        </form>
                        <div className="create-a-page">
                            <p><span>Create a Page </span> for a celebrity, brand or business.</p>
                        </div>
                    </div>
                </div>
            )
        } else{
            return(
                <div>
                    <button onClick={this.logout}>Logout</button>
                </div>
            )
        }
    }
}

export default LoginForm;