import { connect } from "react-redux";
import Profile from "./profile";

const mapStateToProps = () => ({
    firstName: state.entities.users.first_name,
    lastName: state.entities.users.last_name,
    about_me: state.entities.about_me
})

const mapDispatchToProps = () => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);