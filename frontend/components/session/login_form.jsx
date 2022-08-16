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
        this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
        this.handleSubmitSignup = this.handleSubmitSignup.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.logout = this.logout.bind(this);
        this.openModal = this.openModal.bind(this);
        this.loginAsDemoUser = this.loginAsDemoUser.bind(this);
    }

    handleUpdate(field){
        return e => this.setState({[field]: e.currentTarget.value});
    }

    handleSubmitLogin(e){
        e.preventDefault();
        this.props.login(this.state);
        if (store.getState().session.id) this.setState({loggedIn: true});
    }

    handleSubmitSignup(e){
        e.preventDefault();
        this.props.signup(this.state);
        if (store.getState().session.id) this.setState({loggedIn: true});
    }

    logout(){
        this.props.logout();
        this.setState({loggedIn: false});
    }

    openModal(){
        const modal = document.getElementById("modal");
        modal.classList.remove("invisible");
        modal.classList.add("openModal");
        const whiteBackground = document.getElementById("white-background");
        whiteBackground.classList.remove("invisible");
        whiteBackground.classList.add("white-background")
    }

    closeModal(){
        const modal = document.getElementById("modal");
        modal.classList.remove("openModal");
        modal.classList.add("invisible");
        const whiteBackground = document.getElementById("white-background");
        whiteBackground.classList.remove("white-background")
        whiteBackground.classList.add("invisible");
    }

    loginAsDemoUser(){
        this.props.login({email:"demouser@email.com", password: "password"});
        this.setState({loggedIn:true});
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
                        <form onSubmit={this.handleSubmitLogin}>
                            <input type="email" name="email" value={this.state.email} onChange={this.handleUpdate('email')} placeholder="Email" required/>
                            <input type="password" name="password" value={this.state.password} onChange={this.handleUpdate('password')} placeholder="Password" required/>
                            <button type="submit" className="login-button">Log In</button>

                            <div id="demo-login" onClick={this.loginAsDemoUser}>Login as Demo User?</div>

                            <hr />

                            <button onClick={this.openModal}>Create new account</button>
                        </form>
                        <div className="create-a-page">
                            <p><span>Create a Page </span> for a celebrity, brand or business.</p>
                        </div>
                    </div>
                    <div id="modal" className="invisible">
                        <form onSubmit={this.handleSubmitSignup}>
                            <div>
                                <div>
                                    <h1>Sign Up</h1>
                                    <img src="https://static.xx.fbcdn.net/rsrc.php/v3/y2/r/11W0xEwKS62.png" alt="X" onClick={this.closeModal}/>
                                </div>
                                <h2>It's quick and easy.</h2>
                                <hr />
                                <div>
                                    <input type="text" value={this.state.first_name}  onChange={this.handleUpdate('first_name')} placeholder="First name" required/>
                                    <input type="text" value={this.state.last_name} onChange={this.handleUpdate('last_name')} placeholder="Last name" required/>
                                </div>
                                <input type="email" value={this.state.email} onChange={this.handleUpdate('email')} placeholder="Email" required/>
                                <input type="password" value={this.state.password} onChange={this.handleUpdate('password')} placeholder="New password" required/>
                                <label>
                                    <h3>Birthday</h3>
                                    <input type="date" value={this.state.birthday} onChange={this.handleUpdate('birthday')} placeholder="Birthday" required/>
                                </label>
                                <label>
                                        <h3>Gender</h3>
                                    <div>
                                        <div>Male
                                            <input type="radio" value={this.state.gender} onChange={this.handleUpdate('gender')} />
                                        </div>
                                        <div>Female
                                            <input type="radio" value={this.state.gender} onChange={this.handleUpdate('gender')} />
                                        </div>
                                        <div>
                                            <input type="text" value={this.state.gender} onChange={this.handleUpdate('gender')} placeholder="Custom"/>
                                        </div>
                                    </div>
                                </label>
                            </div>
                            <button type="submit">Sign Up</button>
                        </form>       
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