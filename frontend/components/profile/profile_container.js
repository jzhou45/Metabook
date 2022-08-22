import { connect } from "react-redux";
import { fetchUser } from "../../actions/user_actions";
import Profile from "./profile";

const mapStateToProps = (state, ownProps) => {
    const usersId = parseInt(ownProps.location.pathname.split("/")[2]);
    const user = state.entities.users[usersId];
    return user;
}

const mapDispatchToProps = dispatch => ({
    fetchUser: userId => dispatch(fetchUser(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);