import { connect } from "react-redux";
import { fetchPost, fetchPosts } from "../../actions/post_actions";
import Newsfeed from "./newsfeed";

const mapStateToProps = state => ({
    userId: state.session.id
});

const mapDispatchToProps = dispatch => ({
    fetchPosts: () => dispatch(fetchPosts()),
    fetchPost: post => dispatch(fetchPost(post))
});


export default connect(mapStateToProps, mapDispatchToProps)(Newsfeed);