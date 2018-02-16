import axios from "axios";

import { FETCHING_USERS, UPDATING_USER } from "./types";
import { USER, USERS } from "../api";
import {
  generatePostBody,
  requestHeaders,
  getToken
} from "../lib/auth_helpers";
import { dispatchHelper } from "../lib/action_helpers";

export const fetchUsers = () => () => {
  const token = getToken();
  const headers = requestHeaders(token);
  const dispatching = dispatchHelper(FETCHING_USERS);
  const errorMessage = "Could not fetch users";
  dispatching(() => axios.get(USERS, headers), errorMessage);
};

export const updateUser = params => () => {
  const patchParams = generatePostBody("user", params);
  const token = getToken();
  const headers = requestHeaders(token);
  const dispatching = dispatchHelper(UPDATING_USER);
  const errorMessage = "Double check your current password";
  dispatching(() => axios.patch(USER, patchParams, headers), errorMessage);
};
