import {
  SIGNING_OUT,
  FETCHING_TEAMS,
  FETCHING_TEAMS_FAIL,
  FETCHING_TEAMS_SUCCESS
} from "../actions/types";

const INITIAL_STATE = {
  isFetching: false,
  data: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCHING_TEAMS:
      return {
        ...state,
        isFetching: true
      };
    case FETCHING_TEAMS_SUCCESS:
      return {
        isFetching: false,
        data: action.payload
      };
    case SIGNING_OUT:
    case FETCHING_TEAMS_FAIL:
      return INITIAL_STATE;
    default:
      return state;
  }
};
