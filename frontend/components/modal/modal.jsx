import React from "react";
import { connect } from "react-redux";
import { closeModal } from "../../actions/modal_actions";
import { clearErrors } from "../../actions/session_actions";
import Signup from "../../components/session/signup_form"
import NewsfeedModal from "../newsfeed/newsfeed_modal";
import NavBarModal from "../navbar/navbar_modal";


const Modal = props => {
    const {modal, closeModal, clearErrors} = props;

    if (!modal) return null;

    let component;
    let background;

    switch (modal.type) {
        case "signup":
            component = <Signup/>;
            background == "white-background";
            break;
        case "makePosts":
            component = <NewsfeedModal/>;
            background = "black-background";
            break;
        case "navbar":
            component = <NavBarModal/>;
            background = "invisible-background";
            break;
        default:
            return null;
    };

    const reset = () => {
        clearErrors();
        closeModal();
    };

    return (
        <div className={background} onClick={reset}>
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