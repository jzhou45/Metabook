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
        if (this.state.modalOpened){
            this.closeModal();
        } else{
            this.openModal();
        };
    };

    openModal(){
        this.props.openModal("bioModal");
        document.getElementById("biomodal").classList.remove("invisible");
        document.getElementById("about-me-button").classList.add("invisible");
        this.state.modalOpened = true;
    };

    closeModal(){
        this.props.closeModal("bioModal");
        document.getElementById("biomodal").classList.add("invisible");
        document.getElementById("about-me-button").classList.remove("invisible");
        this.state.modalOpened = false;
    };

    render(){
        return(
            <div id="about-me">
                <h1>Intro</h1>
                <h2 id="bio">{this.state.aboutMe}</h2>
                <div id="biomodal" className="invisible">
                    <textarea placeholder="Describe who you are"></textarea>
                    <button onClick={this.handleSubmit}>Cancel</button>
                    <button onClick={this.handleSubmit}>Save</button>
                </div>
                <button id="about-me-button" onClick={this.handleSubmit}></button>
            </div>
        );
    };
};

export default AboutMe;