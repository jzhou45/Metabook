import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchUser } from "../../actions/user_actions";

// class AboutMe extends React.Component{
//     // constructor(props){
//     //     super(props);
//     //     this.state = {
//     //         aboutMe: "",
//     //         previousAboutMe: "",
//     //         modalOpened: false,
//     //         id: ""
//     //     };

//     //     this.handleSubmit = this.handleSubmit.bind(this);
//     //     this.handleUpdate = this.handleUpdate.bind(this);
//     //     this.handleCancelSubmit = this.handleCancelSubmit.bind(this);
//     //     this.handleSaveSubmit = this.handleSaveSubmit.bind(this);
//     //     this.closeModal = this.closeModal.bind(this);
//     // };

//     // componentDidMount(){
//     //     this.props.fetchUser(this.props.usersId).then(user => {
//     //         this.setState({
//     //             aboutMe: user.user.about_me,
//     //             id: user.user.id
//     //         });
//     //         (this.state.aboutMe) ? document.getElementById("about-me-button").innerHTML = "Edit bio" : document.getElementById("about-me-button").innerHTML = "Add bio";
//     //     });
//     // };

//     handleUpdate(field){
//         return e => this.setState({[field]: e.currentTarget.value});
//     };

//     handleSubmit(e){
//         if (this.state.modalOpened){
//             this.closeModal();
//         } else{
//             this.openModal();
//         };
//     };

//     openModal(){
//         this.state.previousAboutMe = this.state.aboutMe;
//         this.props.openModal("bioModal");
//         document.getElementById("biomodal").classList.remove("invisible");
//         document.getElementById("about-me-button").classList.add("invisible");
//         document.getElementById("bio").classList.add("invisible");
//         this.state.modalOpened = true;
//     };

//     closeModal(){
//         document.getElementById("biomodal").classList.add("invisible");
//         document.getElementById("about-me-button").classList.remove("invisible");
//         document.getElementById("bio").classList.remove("invisible");
//         this.state.modalOpened = false;
//         this.props.closeModal("bioModal");
//     };

//     handleCancelSubmit(){
//         this.setState({
//             aboutMe: this.state.previousAboutMe
//         });
//         this.closeModal();
//     };

//     handleSaveSubmit(){
//         $.ajax({
//             url: `api/users/${this.state.id}`,
//             method: 'PATCH',
//             data: {'user[about_me]': this.state.aboutMe},
//         });
//         this.closeModal();
//     }

//     render(){
//         return(
//             <div id="about-me">
//                 <div>
//                     <h1>Intro</h1>
//                     <div>
//                         <h2 id="bio">{this.state.aboutMe}</h2>
//                         <div id="biomodal" className="invisible">
//                             <textarea placeholder="Describe who you are" onChange={this.handleUpdate('aboutMe')} value={this.state.aboutMe}></textarea>
//                             <div>
//                                 <button onClick={this.handleCancelSubmit}>Cancel</button>
//                                 <button onClick={this.handleSaveSubmit}>Save</button>
//                             </div>
//                         </div>
//                         {(this.props.currentUserId === this.props.usersId) ? (<button id="about-me-button" onClick={this.handleSubmit}></button>) : null}
//                     </div>
//                 </div>
//             </div>
//         );
//     };
// };

// export default AboutMe;

const AboutMe = props => {
    const {usersId, currentUserId, fetchUser} = props;

    const [state, setState] = useState({
        aboutMe: "",
        previousAboutMe: "",
        editing: false
    });

    useEffect(() => {
        fetchUser(usersId).then(data => {
            setState({
                ...state,
                aboutMe: data.user.about_me
            });
        });
    }, []);

    const handleUpdate = field => (
        e => setState({
            ...state,
            [field]: e.currentTarget.value
        })
    );

    return(
        <div className="about-me">
            <div>
                <h1>Intro</h1>
                <div>
                    <h2>{state.aboutMe}</h2>
                    {(state.editing) ?
                        (<div className="biomodal">
                            <textarea
                                placeholder="Describe who you are"
                                onChange={handleUpdate('aboutMe')}
                                value={state.aboutMe}
                            >
                            </textarea>
                            <div>
                                <div onClick={handleCancelSubmit}>Cancel</div>
                                <div onClick={handleSaveSubmit}>Save</div>
                            </div>
                        </div>) :
                    null}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    const usersId = parseInt(ownProps.location.pathname.split("/")[2]);
    return({
        usersId,
        currentUserId: state.session.id
    });
};

const mapDispatchToProps = dispatch => ({
    fetchUser: userId => dispatch(fetchUser(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(AboutMe);