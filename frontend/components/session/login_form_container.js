import { connect } from "react-redux";
import LoginForm from "./login_form";
import { clearErrors, login, logout } from "../../actions/session_actions";
import { openModal } from "../../actions/modal_actions";

const mapStateToProps = state => ({
    errors: state.errors.session
})

const mapDispatchToProps = dispatch => ({
    login: user => dispatch(login(user)),
    logout: () => dispatch(logout()),
    openModal: modal => dispatch(openModal(modal)),
    clearSessionErrors: () => dispatch(clearErrors())
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);