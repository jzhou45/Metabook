import * as APIUtil from "../util/posts_api_utils";

export const RECEIVE_ALL_POSTS = "RECEIVE_ALL_POSTS";
export const RECEIVE_POST = "RECEIVE_POST";

const receiveAllPosts = (posts) => ({
    type: RECEIVE_ALL_POSTS,
    posts
});

const receivePost = post => ({
    type: RECEIVE_POST,
    post
});

export const fetchPosts = () => dispatch => (
    APIUtil.fetchPosts().then((posts) => dispatch(receiveAllPosts(posts)))
);

export const fetchPost = postId => dispatch => (
    APIUtil.fetchPost(postId).then(post => dispatch(receivePost(post)))
);

export const editPost = post => dispatch => {
    return APIUtil.editPost(post.id).then(post => dispatch(receivePost(post)));
};