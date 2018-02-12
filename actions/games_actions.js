import axios from "axios";

import { FETCHING_GAMES } from "./types";
import { GAMES } from "../endpoints";
import {
  generatePostBody,
  requestHeaders,
  getToken
} from "../lib/auth_helpers";
import { dispatchHelper } from "../lib/action_helpers";

export const fetchGames = () => () => {
  const token = getToken();
  const headers = requestHeaders(token);
  const dispatching = dispatchHelper(FETCHING_GAMES);
  const errorMessage = "Could not fetch games";
  dispatching(() => axios.get(GAMES, headers), errorMessage);
};
