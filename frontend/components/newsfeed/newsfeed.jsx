import React from "react";
import PostItem from "./post_item";

class Newsfeed extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            content: "",
            userId: this.props.userId,
            posts: {}
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.goToProfilePage = this.goToProfilePage.bind(this);
    };

    componentDidMount(){
        this.props.fetchPosts().then(posts => {
            this.setState({posts: posts.posts})
        });
    };

    handleUpdate(field){
        return e => this.setState({[field]: e.currentTarget.value});
    };

    handleSubmit(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append('post[content]', this.state.content);
        formData.append('post[user_id]', this.state.userId);
        $.ajax({
            url: 'api/posts',
            method: "POST",
            data: formData,
            contentType: false,
            processData: false
        }).then(() => {
            this.setState({
                content: ""
            });
            this.props.fetchPosts().then(posts => {
                this.setState({posts: posts.posts})
            });
        });
    };

    goToProfilePage(){
        this.props.history.push(`/users/${this.props.userId}`);
    };

    render(){
        return(
            <div id="newsfeed">
                <div id="make-posts">
                    <img src={this.props.profilePhoto} alt="profile photo" onClick={this.goToProfilePage}/>
                    <input type="text" placeholder={`What's on your mind, ${this.props.firstName}?`} />
                </div>

                <form onSubmit={this.handleSubmit}>
                    <textarea value={this.state.content} onChange={this.handleUpdate('content')}></textarea>
                    <button type="submit">SUBMIT</button>
                </form>
                <div id="all-posts">
                    {Object.values(this.state.posts).map(post => (
                        <PostItem key={post.id} post={post} />
                    ))}
                </div>
            </div>
        );
    };
};

export default Newsfeed;