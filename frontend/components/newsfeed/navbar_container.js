import { connect } from "react-redux";
import NavBar from "./navbar";
import {logout} from "../../actions/session_actions";

const mapStateToProps = ({session, entities: {users}}) => {
    return{
        currentUser: users[session.id]
    }
}

export default connect(mapStateToProps, null)(NavBar);