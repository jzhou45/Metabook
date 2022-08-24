import { connect } from "react-redux";
import { closeModal, openModal } from "../../actions/modal_actions";
import { fetchPost, fetchPosts } from "../../actions/post_actions";
import Newsfeed from "./newsfeed";

const mapStateToProps = state => {
    const currentUserId = state.session.id
    return({
        userId: currentUserId,
        profilePhoto: state.entities.users[currentUserId].profilePhoto,
        firstName: state.entities.users[currentUserId].first_name,
        modal: state.ui.modal
    });
};

const mapDispatchToProps = dispatch => ({
    fetchPosts: () => dispatch(fetchPosts()),
    fetchPost: post => dispatch(fetchPost(post)),
    openModal: modal => dispatch(openModal(modal)),
    closeModal: () => dispatch(closeModal())
});


export default connect(mapStateToProps, mapDispatchToProps)(Newsfeed);