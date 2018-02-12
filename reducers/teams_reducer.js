import {
  SIGNING_OUT,
  FETCHING_TEAMS,
  FETCHING_TEAMS_FAIL,
  FETCHING_TEAMS_SUCCESS,
  CREATING_TEAM,
  CREATING_TEAM_FAIL,
  CREATING_TEAM_SUCCESS
} from "../actions/types";

const INITIAL_STATE = {
  isFetching: false,
  isCreating: false,
  data: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCHING_TEAMS:
      return {
        ...state,
        isFetching: true
      };
    case FETCHING_TEAMS_FAIL:
      return {
        ...state,
        isFetching: false
      };
    case FETCHING_TEAMS_SUCCESS:
      return {
        isFetching: false,
        data: action.payload
      };
    case CREATING_TEAM:
      return {
        ...state,
        isCreating: true
      };
    case CREATING_TEAM_FAIL:
      return {
        ...state,
        isCreating: false
      }
    case CREATING_TEAM_SUCCESS:
      return {
        ...state,
        isCreating: false,
        data: [
          ...state.data,
          action.payload
        ]
      }
    case SIGNING_OUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
