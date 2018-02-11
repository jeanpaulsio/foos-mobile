import axios from "axios";

import { UPDATING_USER } from "./types";
import { USER } from "../endpoints";
import {
  generatePostBody,
  requestHeaders,
  getToken
} from "../lib/auth_helpers";
import { dispatchHelper } from "../lib/action_helpers";

export const updateUser = params => () => {
  const patchParams = generatePostBody("user", params);
  const token = getToken();
  const headers = requestHeaders(token);
  const dispatching = dispatchHelper(UPDATING_USER);
  const errorMessage = "Double check your current password";
  dispatching(() => axios.patch(USER, patchParams, headers), errorMessage);
};
