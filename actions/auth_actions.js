import axios from "axios";

import { VALIDATING_TOKEN, SIGNING_IN, SIGNING_UP, SIGNING_OUT } from "./types";
import { PING, USER_TOKEN, USER_REGISTRATION } from "../endpoints";
import {
  generatePostBody,
  requestHeaders,
  removeToken
} from "../lib/auth_helpers";
import { dispatchHelper } from "../lib/action_helpers";

export const validateToken = token => () => {
  const headers = requestHeaders(token);
  const dispatching = dispatchHelper(VALIDATING_TOKEN);
  const errorMessage = "Sign in to view this content";
  dispatching(() => axios.get(PING, headers), errorMessage);
};

export const signIn = params => () => {
  const postParams = generatePostBody("auth", params);
  const dispatching = dispatchHelper(SIGNING_IN);
  const errorMessage = "Double check your username and password";
  dispatching(() => axios.post(USER_TOKEN, postParams), errorMessage);
};

export const signUp = params => () => {
  const postParams = generatePostBody("user", params);
  const dispatching = dispatchHelper(SIGNING_UP);
  const errorMessage = "Something went wrong";
  dispatching(() => axios.post(USER_REGISTRATION, postParams), errorMessage);
};

export const signOut = () => dispatch => {
  removeToken();
  dispatch({ type: SIGNING_OUT });
};
