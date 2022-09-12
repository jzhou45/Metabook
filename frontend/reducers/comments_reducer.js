import { RECEIVE_COMMENT } from "../actions/comment_actions";

const commentsReducer = (state={}, action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_COMMENT:
            return Object.assign({}, state, {[action.comment.id]: action.comment});
        default:
            return state;
    };
};

export default commentsReducer;