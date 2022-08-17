import { connect } from "react-redux";
import SignupForm from "./signup_form";
import { signup } from "../../actions/session_actions";
import { closeModal } from "../../actions/modal_actions";

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
    signup: user => dispatch(signup(user)),
    closemodal: () => dispatch(closeModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);