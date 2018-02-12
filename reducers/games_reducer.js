import {
  SIGNING_OUT,
  FETCHING_GAMES,
  FETCHING_GAMES_FAIL,
  FETCHING_GAMES_SUCCESS,
} from "../actions/types";

const INITIAL_STATE = {
  isFetching: false,
  isCreating: false,
  data: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCHING_GAMES:
      return {
        ...state,
        isFetching: true
      };
    case FETCHING_GAMES_FAIL:
      return {
        ...state,
        isFetching: false
      };
    case FETCHING_GAMES_SUCCESS:
      return {
        isFetching: false,
        data: action.payload
      };
    case SIGNING_OUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
