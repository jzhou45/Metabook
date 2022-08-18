import { connect } from "react-redux";
import Profile from "./profile";

const mapStateToProps = (state, ownProps) => {
    console.log(ownProps)
    return{
    userId: state.entities.users[ownProps.match.params.usersId]
}}

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, null)(Profile);