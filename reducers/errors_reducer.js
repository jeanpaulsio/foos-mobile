import {
  SIGN_OUT,
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
    case SIGN_OUT:
    default:
      return INITIAL_STATE;
  }
};
