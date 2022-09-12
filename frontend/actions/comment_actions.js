import * as APIUtil from "../util/comments_api_utils";

export const RECEIVE_COMMENT = "RECEIVE_COMMENT";

const receiveComment = comment => ({
    type: RECEIVE_COMMENT,
    comment
});

export const fetchComment = commentId => dispatch => (
    APIUtil.fetchComment(commentId).then(comment => dispatch(receiveComment(comment)))
);