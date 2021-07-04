const { isNotNullOrEmpty } = require("../index");
const assert = require("assert");
const bodySchema = require("../lib/bodySchema");

const defaultLabel = "Value";
const defaultMsg = "cannot be null or empty";

describe("isNotNullOrEmpty", () => {
  // Fail conditions:
  it("should fail when `value` is an empty string.", () => {
    const expected = bodySchema(true, defaultLabel, defaultMsg);
    assert.deepStrictEqual(isNotNullOrEmpty(""), expected);
    assert.deepStrictEqual(isNotNullOrEmpty("   "), expected);
  });

  it("should fail when `value` is an empty array.", () => {
    const expected = bodySchema(true, defaultLabel, defaultMsg);
    assert.deepStrictEqual(isNotNullOrEmpty([]), expected);
  });

  it("should fail when `value` is null.", () => {
    const expected = bodySchema(true, defaultLabel, defaultMsg);
    assert.deepStrictEqual(isNotNullOrEmpty(null), expected);
  });

  it("should fail when `value` is an object with no keys.", () => {
    const expected = bodySchema(true, defaultLabel, defaultMsg);
    assert.deepStrictEqual(isNotNullOrEmpty({}), expected);
  });

  // Pass conditions:
  it("should pass when `value` is a filled string.", () => {
    const expected = bodySchema(false, defaultLabel, defaultMsg);
    assert.deepStrictEqual(isNotNullOrEmpty("Something"), expected);
    assert.deepStrictEqual(isNotNullOrEmpty("   A   "), expected);
  });

  it("should pass when `value` is a filled array.", () => {
    const expected = bodySchema(false, defaultLabel, defaultMsg);
    assert.deepStrictEqual(isNotNullOrEmpty(["A"]), expected);
    assert.deepStrictEqual(isNotNullOrEmpty([1]), expected);
    assert.deepStrictEqual(isNotNullOrEmpty([{}]), expected);
  });

  it("should pass when `value` is an object with keys.", () => {
    const expected = bodySchema(false, defaultLabel, defaultMsg);
    assert.deepStrictEqual(isNotNullOrEmpty({ key: null }), expected);
    assert.deepStrictEqual(isNotNullOrEmpty({ key: 1 }), expected);
    assert.deepStrictEqual(isNotNullOrEmpty({ key: "" }), expected);
    assert.deepStrictEqual(isNotNullOrEmpty({ key: true }), expected);
  });
});
