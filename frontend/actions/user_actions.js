import * as APIUtil from "../util/users_api_utils";

export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_USERS = "RECEIVE_USERS";

const receiveUser = user => ({
    type: RECEIVE_USER,
    user
});

const receiveUsers = users => ({
    type: RECEIVE_USERS,
    users
});

export const fetchUser = userId => dispatch => (
    APIUtil.fetchUser(userId).then(user => dispatch(receiveUser(user)))
);

export const fetchUsers = () => dispatch => (
    APIUtil.fetchUsers().then(users => dispatch(receiveUsers(users)))
);