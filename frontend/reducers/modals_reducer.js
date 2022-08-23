import { OPEN_MODAL, CLOSE_MODAL } from '../actions/modal_actions';

const modalsReducer = (state = {}, action) => {
    Object.freeze(state);
    const nextState = Object.assign({}, state);

    switch (action.type) {
        case OPEN_MODAL:
            nextState.modal = true;
            return nextState;
        case CLOSE_MODAL:
            nextState.modal = null;
            return nextState;
        default:
            return state;
    };
};

export default modalsReducer;