import axios from "axios";

import { FETCHING_GAMES, CREATING_GAME } from "./types";
import { GAMES } from "../api";
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

export const createGame = params => () => {
  const postParams = generatePostBody("game", params);
  const token = getToken();
  const headers = requestHeaders(token);
  const dispatching = dispatchHelper(CREATING_GAME);
  const errorMessage = "Could not create game";
  dispatching(() => axios.post(GAMES, postParams, headers), errorMessage);
}
