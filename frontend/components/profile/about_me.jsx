import React from "react";

class AboutMe extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            aboutMe: "",
            modalOpened: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    };

    componentDidMount(){
        this.props.fetchUser(this.props.usersId).then(user => {
            this.setState({
                aboutMe: user.user.about_me
            });
            (this.state.aboutMe) ? document.getElementById("about-me-button").innerHTML = "Edit bio" : document.getElementById("about-me-button").innerHTML = "Add bio";
        });
    };

    handleSubmit(e){
        alert("dwa")
        if (this.state.modalOpened){
            this.closeModal();
        } else{
            this.openModal();
        }
    };

    openModal(){
        this.props.openModal("bioModal");
        const textarea = document.createElement("textarea");
        document.getElementById("biomodal").appendChild(textarea);
    }

    render(){
        return(
            <div id="about-me">
                <h1>Intro</h1>
                <h2 id="bio">{this.state.aboutMe}</h2>
                <div id="biomodal"></div>
                <button id="about-me-button" onClick={this.handleSubmit}></button>
            </div>
        );
    };
};

export default AboutMe;