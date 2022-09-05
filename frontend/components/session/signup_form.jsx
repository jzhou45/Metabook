import React, { useState } from "react";
import { connect } from "react-redux";
import { closeModal } from "../../actions/modal_actions";
import { signup } from "../../actions/session_actions";

// class SignupForm extends React.Component{
//     constructor(props){
//         super(props);
//         this.state = {
//             email: '',
//             password: '',
//             loggedIn: false,
//             first_name: '',
//             last_name: '',
//             birthday: '',
//             gender: ''
//         };
//         this.closeModal = this.closeModal.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//         this.handleUpdate = this.handleUpdate.bind(this);
//         this.clearErrors = this.clearErrors.bind(this);
//     };

//     handleUpdate(field){
//         return e => this.setState({[field]: e.currentTarget.value});
//     };

//     handleSubmit(e){
//         e.preventDefault();
//         this.props.signup(this.state);
//         if (this.props.sessionId) this.setState({loggedIn: true});
//         this.handleErrors();
//     };

//     closeModal(){
//         this.props.closemodal();
//         const modal = document.getElementById("modal");
//         modal.classList.remove("openModal");
//         modal.classList.add("invisible");
//         const whiteBackground = document.getElementById("white-background");
//         whiteBackground.classList.remove("white-background")
//         whiteBackground.classList.add("invisible");
//     };

//     handleErrors(){
//         if (this.state.first_name.length === 0) document.getElementById("signup-first-name").style.border = "1px solid #f02849";
//         if (this.state.last_name.length === 0) document.getElementById("signup-last-name").style.border = "1px solid #f02849";
//         if (this.state.email.length === 0) document.getElementById("signup-email").style.border = "1px solid #f02849";
//         if (this.state.password.length < 8) document.getElementById("signup-password").style.border = "1px solid #f02849";
//         if (this.state.birthday.length === 0) document.getElementById("signup-birthday").style.border = "1px solid #f02849";
//         if (this.state.gender.length === 0) document.getElementById("signup-gender").style.border = "1px solid #f02849";
//     };

//     clearErrors(){
//         this.props.clearSessionErrors();
//         document.getElementById("signup-first-name").style.border = "1px solid #dde0e3";
//         document.getElementById("signup-last-name").style.border = "1px solid #dde0e3";
//         document.getElementById("signup-email").style.border = "1px solid #dde0e3";
//         document.getElementById("signup-password").style.border = "1px solid #dde0e3";
//         document.getElementById("signup-birthday").style.border = "1px solid #dde0e3";
//         document.getElementById("signup-gender").style.border = "1px solid #dde0e3";
//     };

//     render(){
//         return(
//             <div id="signup-form">
//                 <div id="modal">
//                     <form onSubmit={this.handleSubmit}>
//                         <div>
//                             <div>
//                                 <h1>Sign Up</h1>
//                                 <img src="https://static.xx.fbcdn.net/rsrc.php/v3/y2/r/11W0xEwKS62.png" alt="X" onClick={this.closeModal}/>
//                             </div>
//                             <h2>It's quick and easy.</h2>
//                             {(this.props.errors.length > 0) ?
//                                 <div className="signup-errors">
//                                     {this.props.errors.join(". ")}
//                                 </div> : null
//                             }
//                             <hr />
//                             <div>
//                                 <input type="text" value={this.state.first_name}  onChange={this.handleUpdate('first_name')} id="signup-first-name" placeholder="First name" onFocus={this.clearErrors}/>
//                                 <input type="text" value={this.state.last_name} onChange={this.handleUpdate('last_name')} id="signup-last-name" placeholder="Last name" onFocus={this.clearErrors}/>
//                             </div>
//                             <input type="text" value={this.state.email} onChange={this.handleUpdate('email')} id="signup-email" placeholder="Email" onFocus={this.clearErrors}/>
//                             <input type="password" value={this.state.password} onChange={this.handleUpdate('password')} id="signup-password" placeholder="New password" onFocus={this.clearErrors}/>
//                             <label>
//                                 <h3>Birthday</h3>
//                                 <input type="date" value={this.state.birthday} onChange={this.handleUpdate('birthday')} id="signup-birthday" placeholder="Birthday" onFocus={this.clearErrors}/>
//                             </label>
//                             <label>
//                                 <h3>Gender</h3>
//                                 <select id="signup-gender" onChange={this.handleUpdate('gender')}>
//                                     <option disabled selected>Gender</option>
//                                     <option value="Male">Male</option>
//                                     <option value="Female">Female</option>
//                                     <option value="Other">Other</option>
//                                     <option value="Other">Prefer not to say</option>
//                                 </select>
//                             </label>
//                         </div>
//                         <h4>This is a clone of Facebook for educational purposes, please don't sue me Mr. Mark Zuckerberg. <span>Don't Learn More.</span></h4>
//                         <h4>By clicking Sign Up, you agree to our <span>Terms</span>, <span>Privacy Policy</span>, and <span>Cookies Policy</span> which does not exist. You will not receive SMS Notifications from us and can not opt in any time.</h4>
//                         <button type="submit">Sign Up</button>
//                     </form>       
//                 </div>
//             </div>
//         );
//     };
// };

// export default SignupForm;

const SignupForm = props => {
    const {errors, signup, closeModal} = props;

    const [state, setState] = useState({
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        birthday: "",
        gender: ""
    });

    const handleUpdate = field => (
        e => setState({
            ...state,
            [field]: e.currentTarget.value
        })
    );

    const handleSubmit = e => {
        e.preventDefault();
        signup(state);
    };

    return(
      <div className="signup-form-container">
        <div className="signup-form-div">
            <form onSubmit={handleSubmit}>
                <div>

                    <div>
                        <h1>Sign Up</h1>
                        <img src="https://static.xx.fbcdn.net/rsrc.php/v3/y2/r/11W0xEwKS62.png" alt="X" onClick={closeModal}/>
                    </div>

                    <h2>It's quick and easy</h2>

                    <hr />

                    <div>
                        <input 
                            type="text" 
                            value={state.first_name}
                            onChange={handleUpdate("first_name")}
                            placeholder="First Name"
                        />

                        <input 
                            type="text" 
                            value={state.last_name}
                            onChange={handleUpdate("last_name")}
                            placeholder="Last Name"
                        />
                    </div>

                    <input 
                        type="text" 
                        value={state.email}
                        onChange={handleUpdate("email")}
                        placeholder="Email"
                    />

                    <input 
                        type="password"
                        value={state.password}
                        onChange={handleUpdate("password")}
                        placeholder="Password"
                    />

                    <label htmlFor="birthday">
                        <h3>Birthday</h3>
                        <input 
                            type="date" 
                            name="birthday"
                            value={state.birthday}
                            onChange={handleUpdate("birthday")}
                            placeholder="Birthday"
                        />
                    </label>

                    <label htmlFor="gender">
                        <h3>Gender</h3>
                        <select name="gender" onChange={handleUpdate("gender")}>
                            <option disabled defaultValue={state.gender}>Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                            <option value="Other">Prefer not to say</option>
                        </select>
                    </label>
                </div>
                <h4>This is a clone of Facebook for educational purposes, please don't sue me Mr. Mark Zuckerberg. <span>Don't Learn More.</span></h4>
                <h4>By clicking Sign Up, you agree to our <span>Terms</span>, <span>Privacy Policy</span>, and <span>Cookies Policy</span> which does not exist. You will not receive SMS Notifications from us and can not opt in any time.</h4>
                <button type="submit">Sign Up</button>
            </form>
        </div>
      </div>  
    );
};

const mapStateToProps = state => ({
    errors: state.errors.session
});

const mapDispatchToProps = dispatch => ({
    signup: user => dispatch(signup(user)),
    closeModal: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);