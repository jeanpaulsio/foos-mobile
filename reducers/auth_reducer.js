import { AUTHENTICATE } from "../actions/types";

const INITIAL_STATE = {
  jwt: ""
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return action.payload
    default:
      return state;
  }
}
