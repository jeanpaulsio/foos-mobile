import axios from "axios";
import { FETCHING_TEAMS, CREATING_TEAM } from "./types";
import { TEAMS } from "../api";
import {
  generatePostBody,
  getToken,
  requestHeaders
} from "../lib/auth_helpers";
import { dispatchHelper } from "../lib/action_helpers";

export const fetchTeams = () => () => {
  const token = getToken();
  const headers = requestHeaders(token);
  const dispatching = dispatchHelper(FETCHING_TEAMS);
  const errorMessage = "Could not fetch teams";
  dispatching(() => axios.get(TEAMS, headers), errorMessage);
};

export const createTeam = params => () => {
  const postParams = generatePostBody("team", params);
  const token = getToken();
  const headers = requestHeaders(token);
  const dispatching = dispatchHelper(CREATING_TEAM);
  const errorMessage = "Could not create team";
  dispatching(() => axios.post(TEAMS, postParams, headers), errorMessage);
};
