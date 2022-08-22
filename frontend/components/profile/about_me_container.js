import { connect } from "react-redux";
import { closeModal, openModal } from "../../actions/modal_actions";
import { fetchUser } from "../../actions/user_actions";
import AboutMe from "./about_me";

const mapStateToProps = (state, ownProps) => {
    const usersId = parseInt(ownProps.location.pathname.split("/")[2]);
    return({
        usersId: usersId
    });
};

const mapDispatchToProps = dispatch => ({
    fetchUser: userId => dispatch(fetchUser(userId)),
    openModal: modal => dispatch(openModal(modal)),
    closeModal: modal => dispatch(closeModal(modal))
});

export default connect(mapStateToProps, mapDispatchToProps)(AboutMe);