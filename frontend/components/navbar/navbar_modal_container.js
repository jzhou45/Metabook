import { connect } from "react-redux";
import NavBarModal from "./navbar_modal";
import {logout} from "../../actions/session_actions";
import { closeNavbar } from "../../actions/modal_actions";

const mapStateToProps = state => {
    const currentUserId = state.session.id;
    return {
        currentUser: currentUserId,
        profilePhoto: state.entities.users[currentUserId].profilePhoto,
        firstName: state.entities.users[currentUserId].first_name,
        lastName: state.entities.users[currentUserId].last_name
    };
};

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
    closeNavbar: () => dispatch(closeNavbar())
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBarModal);