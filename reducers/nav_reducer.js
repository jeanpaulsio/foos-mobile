import { AppNavigator } from "../navigators";
import { NAVIGATE_TO_MAIN } from "../actions/types";

export default (state, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);
  switch (action.type) {
    case NAVIGATE_TO_MAIN:
      return {
        ...state,
        index: 1
      };
    default:
      return nextState;
  }
};
