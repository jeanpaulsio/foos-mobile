import {
  DISMISS_SUCCESS,
  UPDATING_USER_FAIL,
  UPDATING_USER_SUCCESS
} from "../actions/types";

const INITIAL_STATE = {
  user: ""
};

export default (state = INITIAL_STATE, { type }) => {
  switch (type) {
    case UPDATING_USER_SUCCESS:
      return { ...state, user: "User Updated" };
    case DISMISS_SUCCESS:
    case UPDATING_USER_FAIL:
    default:
      return INITIAL_STATE;
  }
};
