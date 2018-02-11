import {
  DISMISS_ERRORS,
  SIGNING_IN,
  SIGNING_IN_FAIL,
  SIGNING_IN_SUCCESS,
  SIGNING_UP,
  SIGNING_UP_FAIL,
  SIGNING_UP_SUCCESS,
  UPDATING_USER,
  UPDATING_USER_FAIL,
  UPDATING_USER_SUCCESS,
} from "../actions/types";

const INITIAL_STATE = {
  auth: "",
  registration: "",
  user: ""
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SIGNING_IN_FAIL:
      return { ...state, auth: payload };
    case SIGNING_UP_FAIL:
      return { ...state, registration: payload };
    case UPDATING_USER_FAIL:
      return { ...state, user: payload };
    case DISMISS_ERRORS:
    case SIGNING_IN:
    case SIGNING_IN_SUCCESS:
    case SIGNING_UP:
    case SIGNING_UP_SUCCESS:
    case UPDATING_USER:
    case UPDATING_USER_SUCCESS:
    default:
      return INITIAL_STATE;
  }
};
