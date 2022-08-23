import { OPEN_NAVBAR, CLOSE_NAVBAR } from "../actions/modal_actions";

const navbarReducer = (state={}, action) => {
    Object.freeze(state);
    const nextState = Object.assign({}, state);
    switch (action.type) {
        case OPEN_NAVBAR:
            nextState.navbar = true;
            return nextState;
        case CLOSE_NAVBAR:
            nextState.navbar = null;
            return nextState;
        default:
            return state;
    };
};

export default navbarReducer;