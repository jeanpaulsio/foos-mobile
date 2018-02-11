import { combineReducers } from "redux";
import nav from "./nav_reducer";
import auth from "./auth_reducer";
import errors from "./errors_reducer";

const rootReducer = combineReducers({
  nav,
  auth,
  errors
});

export default rootReducer;
