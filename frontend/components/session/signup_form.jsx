import React, { useState } from "react";
import { connect } from "react-redux";
import { closeModal } from "../../actions/modal_actions";
import { signup } from "../../actions/session_actions";

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

    let firstNameError, lastNameError, emailError, passwordError, birthdayError, genderError;

    if (errors.length > 0){
        for (let error of errors){
            switch (error[0]) {
                case "F":
                    firstNameError = error;
                    break;
                case "L":
                    lastNameError = error;
                    break;
                case "E":
                    emailError = error;
                    break;
                case "P":
                    passwordError = error;
                    break;
                case "B":
                    birthdayError = error;
                    break;
                case "G":
                    genderError = error;
                    break;
                default:
                    return null;
            };
        };
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

                    <div className="signup-name-errors">
                        {(firstNameError) ? <p className="signup-errors">{firstNameError}</p> : <div></div>}
                        {(lastNameError) ? <p className="signup-errors">{lastNameError}</p> : null}
                    </div>

                    <input 
                        type="text" 
                        value={state.email}
                        onChange={handleUpdate("email")}
                        placeholder="Email"
                    />

                    {(emailError) ? <p className="signup-errors">{emailError}</p> : null}

                    <input 
                        type="password"
                        value={state.password}
                        onChange={handleUpdate("password")}
                        placeholder="Password"
                    />

                    {(passwordError) ? <p className="signup-errors">{passwordError}</p> : null}

                    <label htmlFor="birthday">
                        <h3>Birthday</h3>
                        <input 
                            type="date" 
                            name="birthday"
                            value={state.birthday}
                            onChange={handleUpdate("birthday")}
                            placeholder="Birthday"
                        />
                        {(birthdayError) ? <p className="signup-errors">{birthdayError}</p> : null}
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
                        {(genderError) ? <p className="signup-errors">{genderError}</p> : null}
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