import * as APIUtil from "../util/users_api_utils";

export const RECEIVE_USER = "RECEIVE_USER";

const receiveUser = user => ({
    type: RECEIVE_USER,
    user
});

export const fetchUser = userId => dispatch => (
    APIUtil.fetchUser(userId).then(user => dispatch(receiveUser(user)))
);