import { AppNavigator } from "../navigators";

import {
  VALIDATING_TOKEN_FAIL,
  VALIDATING_TOKEN_SUCCESS,
  SIGNING_IN_SUCCESS,
  SIGNING_UP_SUCCESS,
  SIGNING_OUT,
  NAVIGATE_TO_MAIN,
  NAVIGATE_TO_GAMES,
  NAVIGATE_TO_LEADERBOARD,
  NAVIGATE_TO_TEAMS,
  NAVIGATE_TO_SETTINGS
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
    case NAVIGATE_TO_GAMES:
      return {
        ...state,
        index: 1,
        routes: [
          state.routes[0],
          {
            ...state.routes[1],
            index: 0
          }
        ]
      };
    case NAVIGATE_TO_LEADERBOARD:
      return {
        ...state,
        index: 1,
        routes: [
          state.routes[0],
          {
            ...state.routes[1],
            index: 1
          }
        ]
      };
    case NAVIGATE_TO_TEAMS:
      return {
        ...state,
        index: 1,
        routes: [
          state.routes[0],
          {
            ...state.routes[1],
            index: 2
          }
        ]
      };
    case NAVIGATE_TO_SETTINGS:
      return {
        ...state,
        index: 1,
        routes: [
          state.routes[0],
          {
            ...state.routes[1],
            index: 3
          }
        ]
      };
    default:
      return nextState;
  }
};
