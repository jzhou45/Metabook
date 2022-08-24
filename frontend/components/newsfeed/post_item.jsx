import React from "react";

class PostItem extends React.Component{
    constructor(props){
        super(props);
    };

    render(){
        return(
            <div id="post-content">
                <p>{this.props.post.content}</p>
                {(this.props.post.photo) ? <img src={this.props.post.photo}/> : null}
            </div>
        );
    };
};

export default PostItem;