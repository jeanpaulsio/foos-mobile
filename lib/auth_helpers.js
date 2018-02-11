import { AsyncStorage } from "react-native";
import store from "../store";

export const persistToken = async jwt => await AsyncStorage.setItem("jwt", jwt);
export const fetchToken = async () => await AsyncStorage.getItem("jwt");
export const removeToken = async () => await AsyncStorage.removeItem("jwt");

export const requestHeaders = token => ({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token
  }
});

export const getToken = () => {
  return store.getState().auth.jwt;
};

export const generatePostBody = (key, body) => ({ [key]: body });
