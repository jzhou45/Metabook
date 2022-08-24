import { connect } from "react-redux";
import { closeModal, openModal } from "../../actions/modal_actions";
import { fetchPost, fetchPosts } from "../../actions/post_actions";
import { fetchUser } from "../../actions/user_actions";
import { editPost } from "../../util/posts_api_utils";
import Newsfeed from "./newsfeed";

const mapStateToProps = state => {
    const currentUserId = state.session.id
    return({
        userId: currentUserId,
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
    editPost: post => dispatch(editPost(post))
});


export default connect(mapStateToProps, mapDispatchToProps)(Newsfeed);