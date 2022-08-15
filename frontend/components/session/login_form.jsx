import React from "react";

class LoginForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    handleUpdate(field){
        return e => this.setState({[field]: e.currentTarget.value});
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.processForm(this.state);
    }

    render(){
        return(
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
        )
    }
}

export default LoginForm;