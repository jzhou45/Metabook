import { connect } from "react-redux";
import NavBar from "./navbar";
import { closeNavbar, openNavbar } from "../../actions/modal_actions";

const mapStateToProps = state => {
    const currentUserId = state.session.id;
    console.log(state)
    return({
        id: currentUserId,
        firstName: state.entities.users[currentUserId].first_name,
        lastName: state.entities.users[currentUserId].last_name,
        navbar: state.ui.navbar
    })
};

const mapDispatchToProps = dispatch => ({
    openNavbar: () => dispatch(openNavbar()),
    closeNavbar: () => dispatch(closeNavbar())
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);