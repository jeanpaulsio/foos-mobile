import { AppNavigator } from "../navigators";

export default (state, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);
  switch (action.type) {
    default:
      return nextState;
  }
}
