import store from "../store";
import { persistToken } from "./auth_helpers";

export const dispatchHelper = type => {
  store.dispatch({ type });

  return async (responseThunk, errorMessage, callback = () => {}) => {
    try {
      const { data } = await responseThunk();
      data.jwt && persistToken(data.jwt);

      store.dispatch({
        type: `${type}_SUCCESS`,
        payload: data
      });
      callback();
    } catch (e) {
      store.dispatch({
        type: `${type}_FAIL`,
        payload: errorMessage
      });
    }
  };
};
