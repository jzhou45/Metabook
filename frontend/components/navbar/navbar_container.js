import { connect } from "react-redux";
import NavBar from "./navbar";
import { closeNavbar, openNavbar } from "../../actions/modal_actions";

const mapStateToProps = ({session, entities: {users}}) => {
    return{
        currentUser: users[session.id]
    };
};

const mapDispatchToProps = dispatch => ({
    openNavbar: () => dispatch(openNavbar()),
    closeNavbar: () => dispatch(closeNavbar())
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);