import {
  UPDATING_USER,
  UPDATING_USER_FAIL,
  UPDATING_USER_SUCCESS,
} from "../actions/types";

const INITIAL_STATE = {
  isUpdating: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATING_USER:
      return {
        ...state,
        isUpdating: true
      }
    case UPDATING_USER_FAIL:
    case UPDATING_USER_SUCCESS:
      return INITIAL_STATE
    default:
      return state;
  }
};
