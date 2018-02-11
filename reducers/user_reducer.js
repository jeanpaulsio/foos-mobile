import {
  UPDATING_USER,
  UPDATING_USER_FAIL,
  UPDATING_USER_SUCCESS,
  FETCHING_USERS,
  FETCHING_USERS_FAIL,
  FETCHING_USERS_SUCCESS,
} from "../actions/types";

const INITIAL_STATE = {
  isUpdating: false,
  isFetching: false,
  list: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATING_USER:
      return {
        ...state,
        isUpdating: true
      }
    case FETCHING_USERS:
      return {
        ...state,
        isFetching: true
      }
    case UPDATING_USER_FAIL:
    case UPDATING_USER_SUCCESS:
      return { ...state, isUpdating: false }
    case FETCHING_USERS_FAIL:
    case FETCHING_USERS_SUCCESS:
      return { ...state, isFetching: false, list: action.payload }
    default:
      return state;
  }
};
