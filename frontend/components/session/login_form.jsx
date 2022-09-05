import React, { useState } from "react";
import { connect } from "react-redux";
import { clearErrors, login } from "../../actions/session_actions";
import { openModal } from "../../actions/modal_actions";

const LoginForm = props => {
    const { errors, login, openModal} = props;

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

                    <div onClick={() => openModal("signup")} className="signup-button">
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