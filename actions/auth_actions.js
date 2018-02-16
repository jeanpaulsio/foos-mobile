import axios from "axios";

import { VALIDATING_TOKEN, SIGNING_IN, SIGNING_UP, SIGNING_OUT } from "./types";
import { PING, USER_TOKEN, USERS } from "../api";
import {
  generatePostBody,
  requestHeaders,
  removeToken
} from "../lib/auth_helpers";
import { dispatchHelper } from "../lib/action_helpers";

export const validateToken = (token, callback) => () => {
  const headers = requestHeaders(token);
  const dispatching = dispatchHelper(VALIDATING_TOKEN);
  const errorMessage = "Sign in to view this content";
  dispatching(() => axios.get(PING, headers), errorMessage, callback);
};

export const signIn = (params, callback) => () => {
  const postParams = generatePostBody("auth", params);
  const dispatching = dispatchHelper(SIGNING_IN);
  const errorMessage = "Double check your username and password";
  dispatching(() => axios.post(USER_TOKEN, postParams), errorMessage, callback);
};

export const signUp = (params, callback) => () => {
  const postParams = generatePostBody("user", params);
  const dispatching = dispatchHelper(SIGNING_UP);
  const errorMessage = "Something went wrong";
  dispatching(() => axios.post(USERS, postParams), errorMessage, callback);
};

export const signOut = () => dispatch => {
  removeToken();
  dispatch({ type: SIGNING_OUT });
};
