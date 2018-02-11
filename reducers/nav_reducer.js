import { AppNavigator } from "../navigators";

import {
  VALIDATING_TOKEN_FAIL,
  VALIDATING_TOKEN_SUCCESS,
  SIGNING_IN_SUCCESS,
  SIGNING_UP_SUCCESS,
  NAVIGATE_TO_MAIN,
  SIGNING_OUT
} from "../actions/types";

export default (state, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);
  switch (action.type) {
    case VALIDATING_TOKEN_FAIL:
    case SIGNING_OUT:
      return {
        ...state,
        index: 0
      };
    case VALIDATING_TOKEN_SUCCESS:
    case SIGNING_IN_SUCCESS:
    case SIGNING_UP_SUCCESS:
    case NAVIGATE_TO_MAIN:
      return {
        ...state,
        index: 1
      };
    default:
      return nextState;
  }
};
