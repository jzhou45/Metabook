import { RECEIVE_ALL_POSTS, RECEIVE_POST } from "../actions/post_actions";

const postsReducer = (state={}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_ALL_POSTS:
            console.log(action.posts)
            return Object.assign({}, state, {posts: action.posts});
        case RECEIVE_POST:
            return Object.assign({}, state, {[action.post.id]: action.post});
        default:
            return state;
    };
};

export default postsReducer;