import { DISMISS_ERRORS, DISMISS_SUCCESS } from "./types";

export const dismissErrors = () => ({
  type: DISMISS_ERRORS
});

export const dismissSuccess = () => ({
  type: DISMISS_SUCCESS
});
