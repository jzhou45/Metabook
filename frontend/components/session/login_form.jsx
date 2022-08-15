import React from "react";
import SignupForm from "./signup_form_container";

class LoginForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            loggedIn: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.logout = this.logout.bind(this);
        this.openModal = this.openModal.bind(this);
    }

    handleUpdate(field){
        return e => this.setState({[field]: e.currentTarget.value});
    }

    handleSubmit(e){
        e.preventDefault();
        const state = this.props.login(this.state);
        if (state) this.setState({loggedIn: true});
    }

    logout(){
        this.props.logout();
        this.setState({loggedIn: false});
    }

    openModal(){
        const modal = document.getElementById("modal");
        modal.classList.add("openModal");
    }

    closeModal(){
        const modal = document.getElementById("modal");
        modal.classList.remove("openModal");
    }

    render(){
        if (!this.state.loggedIn){
            return(
                <div>
                    <div>
                        <form onSubmit={this.handleSubmit}>
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
                    <SignupForm />
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