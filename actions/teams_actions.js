import axios from "axios";
import { FETCHING_TEAMS } from "./types";
import { TEAMS } from "../endpoints";
import { getToken, requestHeaders } from "../lib/auth_helpers";
import { dispatchHelper } from "../lib/action_helpers";

export const fetchTeams = () => () => {
  const token = getToken();
  const headers = requestHeaders(token);
  const dispatching = dispatchHelper(FETCHING_TEAMS);
  const errorMessage = "Could not fetch teams";
  dispatching(() => axios.get(TEAMS, headers), errorMessage);
};
