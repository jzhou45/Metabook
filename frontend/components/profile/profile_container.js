import { connect } from "react-redux";
import { fetchUser } from "../../actions/user_actions";
import Profile from "./profile";

const mapStateToProps = (state, ownProps) => {
    return{
        usersId: parseInt(ownProps.location.pathname.split("/")[2])
    }
}

const mapDispatchToProps = dispatch => ({
    fetchUser: userId => dispatch(fetchUser(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);