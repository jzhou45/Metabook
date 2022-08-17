import { connect } from "react-redux";
import NavBar from "./navbar";
import { logout } from "../../util/session_api_util";

const mapStateToProps = ({session, entities: {users}}) => {
    return{
        currentUser: users[session.id]
    }
}

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
})

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);