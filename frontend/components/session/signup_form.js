import React from "react";

class SignupForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            first_name: '',
            last_name: '',
            birthday: '',
            gender: '',
            loggedIn: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    handleUpdate(field){
        return e => this.setState({[field]: e.currentTarget.value});
    }

    handleSubmit(e){
        e.preventDefault();
        const state = this.props.signup(this.state);
        if (state) this.setState({loggedIn: true});
    }

    logout(){
        this.props.logout();
        this.setState({loggedIn: false});
    }

    render(){
        if (!this.state.loggedIn){
            return(
                <div id="modal">
                <form onSubmit={this.handleSubmit}>
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

export default SignupForm;