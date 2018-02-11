import { AsyncStorage } from "react-native";

export const forceSignOut = async () => {
  await AsyncStorage.removeItem("jwt");
};

export const requestHeaders = token => ({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token
  }
});
