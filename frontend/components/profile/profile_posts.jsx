import React from "react";
import PostItem from "../newsfeed/post_item";

class ProfilePosts extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            content: "",
            currentUserId: this.props.currentUserId,
            posts: {},
            rerender: 0
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.goToProfilePage = this.goToProfilePage.bind(this);
        this.modalControls = this.modalControls.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.rerenderParentCallback = this.rerenderParentCallback.bind(this);
    };

    componentDidMount(){
        this.props.fetchPosts().then(posts => {
            const userPosts = {};
            for (let post of Object.values(posts.posts)){
                if (post.user_id === this.props.usersId){
                    userPosts[post.id] = post;
                };
            };
            this.setState({posts: userPosts});
        });
    };

    handleUpdate(field){
        return e => this.setState({[field]: e.currentTarget.value});
    };

    handleSubmit(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append('post[content]', this.state.content);
        formData.append('post[user_id]', this.state.currentUserId);
        if (e.target[1].files[0]) formData.append('post[photo]', e.target[1].files[0]);
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
        this.closeModal();
    };

    goToProfilePage(){
        this.props.history.push(`/users/${this.props.currentUserId}`);
    };

    modalControls(){
        (this.props.modal.modal) ? (this.closeModal()) : (this.openModal());
    }

    openModal(){
        document.getElementById("profile-posts-modal").classList.remove("invisible");
        document.getElementById("profile-gray-screen").classList.remove("invisible");
        document.body.style.overflow = "hidden";
        this.props.openModal("profile-posts-modal");
    };

    closeModal(){
        document.getElementById("profile-posts-modal").classList.add("invisible");
        document.getElementById("profile-gray-screen").classList.add("invisible");
        document.body.style.overflow = "scroll";
        this.props.closeModal();
    }

    rerenderParentCallback(){
        this.props.fetchPosts().then(posts => {
            this.setState({posts: posts.posts})
        });
    };

    render(){
        return(
            <div id="profile-posts">
                {/* {(this.props.currentUserId === this.props.usersId) ?
                    (<div id="profile-make-posts">
                        <img src={this.props.profilePhoto} alt="profile photo" onClick={this.goToProfilePage}/>
                        <input type="text" placeholder={`What's on your mind, ${this.props.firstName}?`} onClick={this.modalControls} value={this.state.content} />
                    </div>) : null
                }

                {(this.props.currentUserId === this.props.usersId) ? (<div id="profile-gray-screen" className="invisible" onClick={this.closeModal}></div>) : null }

                {(this.props.currentUserId === this.props.usersId) ?
                    (<div id="profile-posts-modal" className="invisible">
                        <div className="create-post">
                            <div></div>
                            <h1>Create post</h1>
                            <div onClick={this.closeModal}>X</div>
                        </div>
                        <div>
                            <img src={this.props.profilePhoto} alt="profile photo" onClick={this.goToProfilePage}/>
                            <p onClick={this.goToProfilePage}>{this.props.firstName} {this.props.lastName}</p>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <textarea value={this.state.content} onChange={this.handleUpdate('content')} placeholder={`What's on your mind, ${this.props.firstName}?`}></textarea>
                            <label htmlFor="create-post-file">Add image to your post</label>
                            <input type="file" onChange={e => {this.setState({file: e.target.files})}} className="invisible" id="create-post-file"/>
                            <button type="submit">Post</button>
                        </form>
                    </div>) : null 
                }

                <div id="profile-all-posts">
                    {Object.values(this.state.posts).map(post => (
                        <PostItem key={post.id} post={post} fetchUser={this.props.fetchUser} history={this.props.history} editPost={this.props.editPost} fetchPost={this.props.fetchPost} rerenderParentCallback={this.rerenderParentCallback} currentUser={this.props.currentUserId} />
                    ))}
                </div> */}
            </div>
        );
    };
};

export default ProfilePosts;