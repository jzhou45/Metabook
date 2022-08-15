import { connect } from "react-redux";
import LoginForm from "./login_form";
import { login, logout } from "../../actions/session_actions";

const mapStateToProps = state => ({
    user: {
        email: '',
        password: ''
    },
    formType: 'Login'
})

const mapDispatchToProps = dispatch => ({
    login: user => dispatch(login(user)),
    logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);