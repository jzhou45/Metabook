import { connect } from "react-redux";
import HomePage from "./homepage";

const mapStateToProps = state => ({
    loggedIn: state.session.id
});

export default connect(mapStateToProps, null)(HomePage);