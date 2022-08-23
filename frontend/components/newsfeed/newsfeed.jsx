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
        });
    };

    render(){
        return(
            <div>
                <button onClick={()=>{console.log(this.state)}}>STATE</button>
                <button onClick={()=>{console.log(this.props)}}>PROPS</button>

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