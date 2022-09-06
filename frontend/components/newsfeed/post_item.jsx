import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PostItem = props => {
    const {post, rerenderNewsfeed, fetchUser, currentUserId, fetchPost} = props;

    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        profilePhoto: "",
        userId: "",
        editingPost: false
    });

    useEffect(() => {
        fetchUser(post.user_id).then(data => {
            setState({
                ...state,
                firstName: data.user.first_name,
                lastName: data.user.last_name,
                profilePhoto: data.user.profilePhoto,
                userId: data.user.id,
                content: post.content,
                previousContent: post.content
            });
        });
    }, []);

    const handleClickEdit = () => {
        setState({
            ...state,
            editingPost: true
        });
    };

    const handleClickDelete = () => {
        $.ajax({
            method: "DELETE",
            url: `api/posts/${post.id}`
        }).then(() => {
            rerenderNewsfeed();
        });
    };

    const handleClickCancel = () => {
        setState({
            ...state,
            content: state.previousContent,
            editingPost: false
        });
    };

    const handleUpdate = field => (
        e => setState({
            ...state,
            [field]: e.currentTarget.value
        })
    );

    const handleSubmit = e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('post[content]', state.content);
        $.ajax({
            method: "PATCH",
            url: `api/posts/${post.id}`,
            data: formData,
            contentType: false,
            processData: false
        }).then(() => 
            fetchPost(post.id)
        ).then(() =>
            setState({
                ...state,
                editingPost: false
            })
        );
    };

    return(
        <div id={`post-content${post.id}`} className="post-content">
            <div className="post-header">
                <div>
                    <Link to={`/users/${state.userId}`}>
                        <img src={state.profilePhoto} alt="profile photo of poster" />
                    </Link>

                    <Link to={`/users/${state.userId}`}>
                        <span>{state.firstName} {state.lastName}</span>
                    </Link>
                </div>

                {(currentUserId === post.user_id) ?
                    (<div className="edit-delete-post"> 
                        <div onClick={handleClickEdit}>
                            <img 
                                src="https://cdn0.iconfinder.com/data/icons/outline-icons/320/Pen-512.png" 
                                alt="edit" 
                            />
                        </div>

                        <div onClick={handleClickDelete}>
                            <img 
                                src="https://icons-for-free.com/iconfiles/png/512/delete+remove+trash+trash+bin+trash+can+icon-1320073117929397588.png" 
                                alt="delete"
                            />
                        </div>
                    </div>) : null
                }
            </div>

            {(state.editingPost) ?
                (<form onSubmit={handleSubmit}>
                    <textarea
                        value={state.content}
                        onChange={handleUpdate("content")}
                        placeholder="Post can't be blank!"
                    ></textarea>

                    <div>
                        <button onClick={handleClickCancel}>Cancel</button>
                        <button type="submit">Save</button>
                    </div>
                </form>) :
                <p>{state.content}</p>
            }

            {(props.post.photo) ?
                <img
                    src={post.photo}
                    className="post-images"
                /> : null
            }
        </div>
    );
};

export default PostItem;