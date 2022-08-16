import { connect } from "react-redux";
import LoginForm from "./login_form";
import { login, logout, signup } from "../../actions/session_actions";

const mapStateToProps = state => ({
    user: {
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        gender: ''
    }, errors: state.errors.session
})

const mapDispatchToProps = dispatch => ({
    login: user => dispatch(login(user)),
    logout: () => dispatch(logout()),
    signup: user => dispatch(signup(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);