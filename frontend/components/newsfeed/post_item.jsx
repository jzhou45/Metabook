import React from "react";

class PostItem extends React.Component{
    constructor(props){
        super(props);
    };

    render(){
        return(
            <div id="post-content">{this.props.post.content}</div>
        );
    };
};

export default PostItem;