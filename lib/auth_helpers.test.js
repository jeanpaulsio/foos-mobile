/* eslint-disable */
import { generatePostBody } from "./auth_helpers";

describe("generatePostBody", () => {
  test("generates POST body for auth requests", () => {
    const actual = generatePostBody("auth", {
      handle: "jp",
      password: "foobar"
    });
    const expected = {
      auth: {
        handle: "jp",
        password: "foobar"
      }
    };

    expect(actual).toEqual(expected);
  });

  test("generates POST body for user requests", () => {
    const actual = generatePostBody("user", {
      handle: "jp",
      password: "foobar",
      password_confirmation: "foobar"
    });
    const expected = {
      user: {
        handle: "jp",
        password: "foobar",
        password_confirmation: "foobar"
      }
    };

    expect(actual).toEqual(expected);
  });
});
