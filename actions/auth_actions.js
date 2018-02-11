import axios from "axios";
import { AsyncStorage } from "react-native";

import {
  TOKEN_VALID,
  TOKEN_INVALID,
  AUTHENTICATE,
  AUTHENTICATE_FAIL,
  SIGN_OUT
} from "./types";
import { PING, USER_TOKEN } from "../endpoints";

export const requestHeaders = token => ({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token
  }
});

export const checkToken = token => async dispatch => {
  try {
    const headers = requestHeaders(token);
    await axios.get(PING, headers);

    dispatch({ type: TOKEN_VALID });
  } catch (e) {
    dispatch({ type: TOKEN_INVALID });
  }
};

export const authenticate = (
  { handle, password },
  callback
) => async dispatch => {
  try {
    const postParams = { auth: { handle, password } };
    const { data } = await axios.post(USER_TOKEN, postParams);
    const { jwt } = data;

    AsyncStorage.setItem("jwt", jwt);
    dispatch({ type: AUTHENTICATE, payload: data });
    callback();
  } catch (e) {
    dispatch({ type: AUTHENTICATE_FAIL });
  }
};

export const signOut = (callback = () => {}) => async dispatch => {
  await AsyncStorage.removeItem("jwt");

  dispatch({ type: SIGN_OUT });
  callback();
};
