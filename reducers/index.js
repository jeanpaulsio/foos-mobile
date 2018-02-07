import { combineReducers } from "redux";
import nav from "./nav_reducer";
import auth from "./auth_reducer";

const rootReducer = combineReducers({
  nav,
  auth
});

export default rootReducer;
