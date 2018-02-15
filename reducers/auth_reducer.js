import {
  SIGNING_IN,
  SIGNING_IN_FAIL,
  SIGNING_IN_SUCCESS,
  SIGNING_UP_SUCCESS,
  SIGNING_OUT,
  VALIDATING_TOKEN,
  VALIDATING_TOKEN_FAIL,
  VALIDATING_TOKEN_SUCCESS
} from "../actions/types";

const INITIAL_STATE = {
  isValidatingToken: false,
  isRequesting: false,
  jwt: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case VALIDATING_TOKEN:
      return {
        isValidatingToken: true,
        jwt: ""
      };
    case VALIDATING_TOKEN_FAIL:
      return {
        isValidatingToken: false,
        jwt: ""
      };
    case SIGNING_IN:
      return {
        isRequesting: true,
        jwt: ""
      };
    case SIGNING_UP_SUCCESS:
    case SIGNING_IN_SUCCESS:
    case VALIDATING_TOKEN_SUCCESS:
      return {
        isRequesting: false,
        ...action.payload
      };
    case SIGNING_IN_FAIL:
    case SIGNING_OUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
