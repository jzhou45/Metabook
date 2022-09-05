import React, { useState } from "react";
import { connect } from "react-redux";
import { clearErrors, login } from "../../actions/session_actions";
import { openModal } from "../../actions/modal_actions";

// class LoginForm extends React.Component{
//     openModal(){
//         this.props.openModal("modal");
//         const modal = document.getElementById("modal");
//         modal.classList.remove("invisible");
//         modal.classList.add("openModal");
//         const whiteBackground = document.getElementById("white-background");
//         whiteBackground.classList.remove("invisible");
//         whiteBackground.classList.add("white-background");
//         this.clearErrors();
//     };


//     handleErrors(){
//         if (this.state.email.length === 0){
//             document.getElementById("login-email").style.border = "1px solid #f02849";
//             document.getElementById("login-email-error-message").innerHTML = "The email you entered isn't connected to an account.";
//             document.getElementById("login-container").firstChild.style.height = "420px";
//         };
//         if (this.state.password.length === 0){

const LoginForm = props => {
    const { errors, login, openModal, clearErrors} = props;

    const [state, setState] = useState({
        email: "",
        password: ""
    });

    const handleUpdate = field => (
        e => setState({
            ...state,
            [field]: e.currentTarget.value
        })
    );

    const handleSubmit = e => {
        e.preventDefault();
        login(state);
    };

    const loginAsDemoUser = () => {
        login({
            email: "demouser@email.com",
            password: "password"
        });
    };

    const loginError = errors[0] ? "login-input-errors" : null;

    return(
        <div className="login-signup-forms">
            <div className="greetings">
                <h1>metabook</h1>
                <h2>Connect with friends and the world around you on Metabook.</h2>
            </div>

            <div className="login-container">
                <form onSubmit={handleSubmit} className="login-form">
                    <input
                        type="text"
                        name="email"
                        value={state.email}
                        onChange={handleUpdate("email")}
                        placeholder="Email"
                        className={loginError}
                    />

                    <input
                        type="password"
                        name="password"
                        value={state.password}
                        onChange={handleUpdate("password")}
                        placeholder="Password"
                        className={loginError}
                    />

                    {(errors) ? (<p className="login-errors">{errors[0]}.</p>) : null}

                    <button type="submit" className="login-button">Log In</button>

                    <div className="demo-login" onClick={loginAsDemoUser}>
                        Login as Demo User?
                    </div>

                    <hr />

                    <div onClick={openModal} className="signup-button">
                        <p>Create new account</p>
                    </div>

                </form>
                
                <div className="create-a-page">
                    <p><span>Create a Page</span> for a celebrity, brand or business.</p>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    errors: state.errors.session
});

const mapDispatchToProps = dispatch => ({
    login: user => dispatch(login(user)),
    openModal: modal => dispatch(openModal(modal)),
    clearErrors: () => dispatch(clearErrors())
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);