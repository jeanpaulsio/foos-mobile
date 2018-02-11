import {
  DISMISS_ERRORS,
  SIGNING_IN,
  SIGNING_IN_FAIL,
  SIGNING_IN_SUCCESS,
  SIGNING_UP,
  SIGNING_UP_FAIL,
  SIGNING_UP_SUCCESS,
} from "../actions/types";

const INITIAL_STATE = {
  authErrors: "",
  registrationErrors: "",
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SIGNING_IN_FAIL:
      return { ...state, authErrors: payload };
    case SIGNING_UP_FAIL:
      return { ...state, registrationErrors: payload };
    case DISMISS_ERRORS:
    case SIGNING_IN:
    case SIGNING_IN_SUCCESS:
    case SIGNING_UP:
    case SIGNING_UP_SUCCESS:
    default:
      return INITIAL_STATE;
  }
};
