import { OPEN_MODAL, CLOSE_MODAL, OPEN_NAVBAR, CLOSE_NAVBAR } from '../actions/modal_actions';

const modalsReducer = (state = {}, action) => {
    Object.freeze(state);
    const nextState = Object.assign({}, state);

    switch (action.type) {
        case OPEN_MODAL:
            nextState.type = action.modal;
            nextState.props = action.props;
            return nextState;
        case CLOSE_MODAL:
            nextState.type = null;
            return nextState;
        case OPEN_NAVBAR:
            nextState.type = "navbar";
            return nextState;
        case CLOSE_NAVBAR:
            nextState.type = null;
            return nextState;
        default:
            return state;
    };
};

export default modalsReducer;