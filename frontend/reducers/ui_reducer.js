import { combineReducers } from "redux";
import modalsReducer from "./modals_reducer";
import navbarReducer from "./navbar_reducer";

const uiReducer = combineReducers({
    modal: modalsReducer,
    navbar: navbarReducer
});

export default uiReducer;