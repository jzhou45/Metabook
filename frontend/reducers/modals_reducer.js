import { OPEN_MODAL, CLOSE_MODAL } from '../actions/modal_actions';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';

const preloadedState = {
    modal: false
}

const modalsReducer = (state = null, action) => {
    Object.freeze(state);
    const nextState = Object.assign({}, state);

    switch (action.type) {
        case OPEN_MODAL:
            nextState.modal = true;
            return nextState;
        case CLOSE_MODAL:
            nextState.modal = false;
            return nextState;
        default:
            return state;
    }
}

export default modalsReducer;