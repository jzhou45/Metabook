import { connect } from "react-redux";
import { closeModal, openModal } from "../../actions/modal_actions";
import { fetchPost, fetchPosts } from "../../actions/post_actions";
import { fetchUser } from "../../actions/user_actions";
import ProfilePosts from "./profile_posts";

const mapStateToProps = (state, ownProps) => {
    const currentUserId = state.session.id
    const usersId = parseInt(ownProps.location.pathname.split("/")[2]);
    return({
        currentUserId: currentUserId,
        usersId: usersId,
        profilePhoto: state.entities.users[currentUserId].profilePhoto,
        firstName: state.entities.users[currentUserId].first_name,
        lastName: state.entities.users[currentUserId].last_name,
        modal: state.ui.modal
    });
};

const mapDispatchToProps = dispatch => ({
    fetchPosts: () => dispatch(fetchPosts()),
    fetchPost: post => dispatch(fetchPost(post)),
    openModal: modal => dispatch(openModal(modal)),
    closeModal: () => dispatch(closeModal()),
    fetchUser: userId => dispatch(fetchUser(userId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePosts);