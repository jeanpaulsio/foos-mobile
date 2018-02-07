export const navigateTo = location => dispatch => {
  dispatch({ type: `${"NAVIGATE_TO_"}${location.toUpperCase()}` });
};
