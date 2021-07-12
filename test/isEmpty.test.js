const isEmpty = require("../lib/isEmpty");
const assert = require("assert");
const bodySchema = require("../lib/bodySchema");

const defaultLabel = "Value";
const defaultMsg = "must be null or empty";

describe("isEmpty", () => {
  // Fail conditions:
  it("should fail when `value` is a filled string.", () => {
    const expected = bodySchema(true, defaultLabel, defaultMsg);
    assert.deepStrictEqual(isEmpty("Something"), expected);
    assert.deepStrictEqual(isEmpty("   A   "), expected);
  });

  it("should fail when `value` is a filled array.", () => {
    const expected = bodySchema(true, defaultLabel, defaultMsg);
    assert.deepStrictEqual(isEmpty(["A"]), expected);
    assert.deepStrictEqual(isEmpty([1]), expected);
    assert.deepStrictEqual(isEmpty([{}]), expected);
  });

  it("should fail when `value` is an object with keys.", () => {
    const expected = bodySchema(true, defaultLabel, defaultMsg);
    assert.deepStrictEqual(isEmpty({ key: null }), expected);
    assert.deepStrictEqual(isEmpty({ key: 1 }), expected);
    assert.deepStrictEqual(isEmpty({ key: "" }), expected);
    assert.deepStrictEqual(isEmpty({ key: true }), expected);
  });

  // Pass conditions:
  it("should pass when `value` is an empty string.", () => {
    const expected = bodySchema(false, defaultLabel, defaultMsg);
    assert.deepStrictEqual(isEmpty(""), expected);
    assert.deepStrictEqual(isEmpty("   "), expected);
  });

  it("should pass when `value` is an empty array.", () => {
    const expected = bodySchema(false, defaultLabel, defaultMsg);
    assert.deepStrictEqual(isEmpty([]), expected);
  });

  it("should pass when `value` is null.", () => {
    const expected = bodySchema(false, defaultLabel, defaultMsg);
    assert.deepStrictEqual(isEmpty(null), expected);
  });

  it("should pass when `value` is an object with no keys.", () => {
    const expected = bodySchema(false, defaultLabel, defaultMsg);
    assert.deepStrictEqual(isEmpty({}), expected);
  });
});
