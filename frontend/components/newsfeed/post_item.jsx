import React from "react";

class PostItem extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            firstName: "",
            lastName: "",
            profilePhoto: "",
            userId: "",
            modalOpened: false,
            editingPost: false,
            content: this.props.post.content,
            previousContent: this.props.post.content,
        };

        this.goToProfilePage = this.goToProfilePage.bind(this);
        this.handleClickEdit = this.handleClickEdit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleClickCancel = this.handleClickCancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClickDelete = this.handleClickDelete.bind(this);
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

    handleClickEdit(){
        this.setState({
            editingPost: true  
        });
    };

    handleUpdate(field){
        return e => this.setState({[field]: e.currentTarget.value});
    };

    handleClickCancel(){
        this.setState({
            content: this.state.previousContent,
            editingPost: false
        });
    };

    handleSubmit(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append('post[content]', this.state.content);
        $.ajax({
            method: "PATCH",
            url: `api/posts/${this.props.post.id}`,
            data: formData,
            contentType: false,
            processData: false
        }).then(
            this.props.fetchPost(this.props.post.id)
        ).then(
            this.setState({
                editingPost: false
            })
        );
    };

    handleClickDelete(){
        $.ajax({
            method: "DELETE",
            url: `api/posts/${this.props.post.id}`
        }).then(() => {
            this.props.rerenderParentCallback();
        });
    };

    render(){
        return(
            <div id={`post-content${this.props.post.id}`} className="post-content">
                <div className="post-header">
                    <div>
                        <img src={this.state.profilePhoto} alt="profile photo of poster" onClick={this.goToProfilePage} />
                        <span onClick={this.goToProfilePage}>{this.state.firstName} {this.state.lastName}</span>
                    </div>
                    {(this.props.currentUser === this.props.post.user_id) ? 
                        (<div id="edit-delete-post">
                            <div onClick={this.handleClickEdit}><img src="https://cdn0.iconfinder.com/data/icons/outline-icons/320/Pen-512.png" alt="edit" /></div>
                            <div onClick={this.handleClickDelete}><img src="https://icons-for-free.com/iconfiles/png/512/delete+remove+trash+trash+bin+trash+can+icon-1320073117929397588.png" alt="trash" /></div>
                        </div>) : null
                    }
                </div>
                {(this.state.editingPost) ?  
                    (<form onSubmit={this.handleSubmit}>
                        <textarea value={this.state.content} onChange={this.handleUpdate("content")} placeholder="Post can't be blank!"></textarea>
                        <div>
                            <button onClick={this.handleClickCancel}>Cancel</button>
                            <button type="submit">Save</button>
                        </div>
                    </form>) :
                    (<p>{this.state.content}</p>)
                }
                {(this.props.post.photo) ? <img className="post-images" src={this.props.post.photo} /> : null}
            </div>
        );
    };
};

export default PostItem;