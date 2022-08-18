import { connect } from "react-redux";
import { fetchUser } from "../../actions/user_actions";
import Profile from "./profile";

const mapStateToProps = (state, ownProps) => {
    const usersId = parseInt(ownProps.location.pathname.split("/")[2])
    // const fname = dispatch(fetchUser(usersId));
    return{
        usersId: parseInt(ownProps.location.pathname.split("/")[2]),
        users: state.entities.users[usersId],
        // firstName: fname
    }
}

const mapDispatchToProps = dispatch => ({
    fetchUser: userId => dispatch(fetchUser(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);