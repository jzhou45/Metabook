import * as APIUtil from "../util/users_api_utils";

export const RECEIVE_USER = "RECEIVE_USER";

const receive_user = user => ({
    type: RECEIVE_USER,
    user
});

export const getUser = user => dispatch => (
    APIUtil.getUser(user.id).then(user => dispatch(receive_user(user)))
);