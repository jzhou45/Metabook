import React from "react";

class PostItem extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            firstName: "",
            lastName: "",
            profilePhoto: "",
            userId: ""
        };

        this.goToProfilePage = this.goToProfilePage.bind(this);
    };

    componentDidMount(){
        this.props.fetchUser(this.props.post.user_id).then(user => {
            this.setState({
                firstName: user.user.first_name,
                lastName: user.user.last_name,
                profilePhoto: user.user.profilePhoto,
                userId: user.user.id
            });
        });
    };

    goToProfilePage(){
        this.props.history.push(`/users/${this.state.userId}`);
    };

    render(){
        return(
            <div id="post-content">
                <div>
                    <img src={this.state.profilePhoto} alt="profile photo of poster" onClick={this.goToProfilePage} />
                    <span onClick={this.goToProfilePage}>{this.state.firstName} {this.state.lastName}</span>
                </div>
                <p>{this.props.post.content}</p>
                {(this.props.post.photo) ? <img src={this.props.post.photo}/> : null}
            </div>
        );
    };
};

export default PostItem;