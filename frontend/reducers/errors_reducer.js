import { combineReducers } from "redux";
import sessionErrorReducer from "./session_errors_reducer";

const errorsReducer = combineReducers({
    session: sessionErrorsReducer
});
  
export default errorsReducer;