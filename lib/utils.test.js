/* eslint-disable */
import _ from "lodash";
import { allEmptyItems } from "./utils";

describe("allEmptyItems", () => {
  test("checks to see if given inputs are empty strings", () => {
    const actual = allEmptyItems("", "", "");
    expect(actual).toEqual(true);
  });

  test("can accept a single item", () => {
    const actual = allEmptyItems("");
    expect(actual).toEqual(true);
  });

  test("returns false when a given string is not empty", () => {
    const actual = allEmptyItems("", "foo", "", "");
    expect(actual).toEqual(false);
  });

  test("accepts undefined and null inputs", () => {
    const actual = allEmptyItems("", null, undefined, "");
    expect(actual).toEqual(true);
  });

  test("accepts an object with values", () => {
    const actual = allEmptyItems("", { foo: "bar" });
    expect(actual).toEqual(false);
  });

  test("accepts an array with values", () => {
    const actual = allEmptyItems("", [1, 2, 3]);
    expect(actual).toEqual(false);
  });

  test("returns true when given empty arrays and objects", () => {
    const actual = allEmptyItems("", null, undefined, [], {});
    expect(actual).toEqual(true);
  });
});
