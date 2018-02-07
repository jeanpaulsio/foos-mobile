import axios from "axios";
import { AsyncStorage } from "react-native";

import { AUTHENTICATE, AUTHENTICATE_FAIL } from "./types";
import { USER_TOKEN } from "../endpoints";

export const authenticate = ({ email, password }, callback) => async dispatch => {
  try {
    const postParams = { auth: { email, password } };
    const { data } = await axios.post(USER_TOKEN, postParams);
    const { jwt } = data;

    AsyncStorage.setItem("jwt", jwt);
    dispatch({ type: AUTHENTICATE, payload: data });
    callback();
  } catch (e) {
    dispatch({ type: AUTHENTICATE_FAIL });
  }
};
