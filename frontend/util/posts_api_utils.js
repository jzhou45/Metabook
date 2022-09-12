export const fetchPosts = () => (
    $.ajax({
        url: '/api/posts/'
    })
);

export const fetchPost = postId => (
    $.ajax({
        url: `/api/posts/${postId}`
    })
);

export const createPost = post => (
    $.ajax({
        url: '/api/posts',
        method: "POST",
        data: {post}
    })
);

export const editPost = post => {
    return $.ajax({
        url: `api/posts/${post.id}`,
        method: 'PATCH',
        data: {post},
        contentType: false,
        processData: false
    })
};