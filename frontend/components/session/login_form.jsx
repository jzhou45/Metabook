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
    }

    handleUpdate(field){
        return e => this.setState({[field]: e.currentTarget.value});
    }

    handleSubmitLogin(e){
        e.preventDefault();
        const state = this.props.login(this.state);
        if (state) this.setState({loggedIn: true});
    }

    handleSubmitSignup(e){
        e.preventDefault();
        const state = this.props.signup(this.state);
        if (state) this.setState({loggedIn: true});
    }

    logout(){
        this.props.logout();
        this.setState({loggedIn: false});
    }

    openModal(){
        const modal = document.getElementById("modal");
        modal.classList.remove("invisible");
        modal.classList.add("openModal");
    }

    closeModal(){
        const modal = document.getElementById("modal");
        modal.classList.remove("openModal");
        modal.classList.add("invisible");
    }

    render(){
        if (!this.state.loggedIn){
            return(
                <div>
                    <div>
                        <form onSubmit={this.handleSubmitLogin}>
                            <label>Email
                                <input type="email" name="email" value={this.state.email} onChange={this.handleUpdate('email')}/>
                            </label>
                            <label>Password
                                <input type="password" name="password" value={this.state.password} onChange={this.handleUpdate('password')}/>
                            </label>
                            <button type="submit">Log In</button>
                        </form>
                    </div>
                    <button onClick={this.openModal}>Create an Account</button>
                    <div id="modal" className="invisible">
                        <form onSubmit={this.handleSubmitSignup}>
                            <div>
                                <div>
                                    <input type="text" value={this.state.first_name}  onChange={this.handleUpdate('first_name')} placeholder="First name" required/>
                                    <input type="text" value={this.state.last_name} onChange={this.handleUpdate('last_name')} placeholder="Last name" required/>
                                </div>
                                <input type="email" value={this.state.email} onChange={this.handleUpdate('email')} placeholder="Email" required/>
                                <input type="password" value={this.state.password} onChange={this.handleUpdate('password')} placeholder="New password" required/>
                                <input type="text" value={this.state.birthday} onChange={this.handleUpdate('birthday')} placeholder="Birthday" required/>
                                <input type="text" value={this.state.gender} onChange={this.handleUpdate('gender')} placeholder="Gender" required/>
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