/* eslint-disable */
import _ from "lodash";
import { someEmptyItems } from "./utils";

describe("someEmptyItems", () => {
  test("checks to see if given inputs are empty strings", () => {
    const actual = someEmptyItems("", "", "");
    expect(actual).toEqual(true);
  });

  test("can accept a single item", () => {
    const actual = someEmptyItems("");
    expect(actual).toEqual(true);
  });

  test("returns true when some items are empty", () => {
    const actual = someEmptyItems("", "foo", "", "");
    expect(actual).toEqual(true);
  });

  test("accepts undefined and null inputs", () => {
    const actual = someEmptyItems("blah", null, undefined, "");
    expect(actual).toEqual(true);
  });

  test("accepts an object with values", () => {
    const actual = someEmptyItems("", { foo: "bar" });
    expect(actual).toEqual(true);
  });

  test("accepts an array with values", () => {
    const actual = someEmptyItems("", [1, 2, 3]);
    expect(actual).toEqual(true);
  });

  test("returns true when given empty arrays and objects", () => {
    const actual = someEmptyItems("asdf", null, undefined, [], {});
    expect(actual).toEqual(true);
  });

  test("returns false when all strings are filled", () => {
    const actual = someEmptyItems("aaa", "bbb", "ccc");
    expect(actual).toEqual(false);
  });
});
