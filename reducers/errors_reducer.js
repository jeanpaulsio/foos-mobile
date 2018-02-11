import {
  DISMISS_ERRORS,
  AUTHENTICATE,
  AUTHENTICATE_FAIL
} from "../actions/types";

const INITIAL_STATE = {
  authErrors: ""
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case AUTHENTICATE_FAIL:
      return { ...state, authErrors: payload };
    case DISMISS_ERRORS:
    case AUTHENTICATE:
    default:
      return INITIAL_STATE;
  }
};
