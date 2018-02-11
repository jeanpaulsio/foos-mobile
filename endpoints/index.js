const PROD_URL = "https://foos-api.herokuapp.com/api";
const DEV_URL = "http://localhost:3000/api";
const BASE_URL = DEV_URL;
const VERSION = "v1"

export const PING              = `${BASE_URL}/${VERSION}/ping`
export const USER_TOKEN        = `${BASE_URL}/${VERSION}/user_token`
export const USER_REGISTRATION = `${BASE_URL}/${VERSION}/users`
export const USER              = `${BASE_URL}/${VERSION}/user`
export const TEAMS             = `${BASE_URL}/${VERSION}/teams`
