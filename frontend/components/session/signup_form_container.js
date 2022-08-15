import { connect } from "react-redux";
import SignUpForm from "./signup_form";
import { signup } from "../../actions/session_actions";

const mapStateToProps = state => ({
    user: {
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        gender: ''
    },
    formType: 'Signup'
})

const mapDispatchToProps = dispatch => ({
    signup: user => dispatch(signup(user)),
    logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);