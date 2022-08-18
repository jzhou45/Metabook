import React from "react";

class SignupForm extends React.Component{
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
        this.closeModal = this.closeModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    handleUpdate(field){
        return e => this.setState({[field]: e.currentTarget.value});
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.signup(this.state);
        if (store.getState().session.id) this.setState({loggedIn: true});
    }

    closeModal(){
        this.props.closemodal();
        const modal = document.getElementById("modal");
        modal.classList.remove("openModal");
        modal.classList.add("invisible");
        const whiteBackground = document.getElementById("white-background");
        whiteBackground.classList.remove("white-background")
        whiteBackground.classList.add("invisible");
    }

    render(){
            return(
                <div id="signup-form">
                    <div id="modal" className="invisible">
                        <form onSubmit={this.handleSubmit}>
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
                                        <input type="text" value={this.state.gender} onChange={this.handleUpdate('gender')} placeholder="Gender"/>
                                </label>
                            </div>
                            <h4>This is a clone of Facebook for educational purposes, please don't sue me Mr. Mark Zuckerberg. <span>Don't Learn More.</span></h4>
                            <h4>By clicking Sign Up, you agree to our <span>Terms</span>, <span>Privacy Policy</span>, and <span>Cookies Policy</span>. You will not receive SMS Notifications from us and can not opt out any time.</h4>
                            <button type="submit">Sign Up</button>
                        </form>       
                    </div>
                </div>
            )
    }
}

export default SignupForm;