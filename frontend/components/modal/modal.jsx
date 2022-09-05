import React from "react";
import { connect } from "react-redux";
import { closeModal } from "../../actions/modal_actions";
import { clearErrors } from "../../actions/session_actions";
import Signup from "../../components/session/signup_form"
import NewsfeedModal from "../newsfeed/newsfeed_modal";

const Modal = props => {
    const {modal, closeModal, clearErrors} = props;

    if (!modal) return null;

    let component;

    switch (modal.type) {
        case "signup":
            component = <Signup/>;
            break;
        case "makePosts":
            component = <NewsfeedModal/>
            break;
        default:
            return null;
    };

    const reset = () => {
        clearErrors();
        closeModal();
    };

    return (
        <div className="modal-background" onClick={reset}>
            <div className="modal-child" onClick={e => e.stopPropagation()}>
                {component}
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    modal: state.ui.modal
});

const mapDispatchToProps = dispatch => ({
    closeModal: () => dispatch(closeModal()),
    clearErrors: () => dispatch(clearErrors())
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);