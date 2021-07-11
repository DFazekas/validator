const { isNotEmpty } = require("../index");
const assert = require("assert");
const bodySchema = require("../lib/bodySchema");

const defaultLabel = "Value";
const defaultMsg = "cannot be null or empty";

describe("isNotEmpty", () => {
  // Fail conditions:
  it("should fail when `value` is an empty string.", () => {
    const expected = bodySchema(true, defaultLabel, defaultMsg);
    assert.deepStrictEqual(isNotEmpty(""), expected);
    assert.deepStrictEqual(isNotEmpty("   "), expected);
  });

  it("should fail when `value` is an empty array.", () => {
    const expected = bodySchema(true, defaultLabel, defaultMsg);
    assert.deepStrictEqual(isNotEmpty([]), expected);
  });

  it("should fail when `value` is null.", () => {
    const expected = bodySchema(true, defaultLabel, defaultMsg);
    assert.deepStrictEqual(isNotEmpty(null), expected);
  });

  it("should fail when `value` is an object with no keys.", () => {
    const expected = bodySchema(true, defaultLabel, defaultMsg);
    assert.deepStrictEqual(isNotEmpty({}), expected);
  });

  // Pass conditions:
  it("should pass when `value` is a filled string.", () => {
    const expected = bodySchema(false, defaultLabel, defaultMsg);
    assert.deepStrictEqual(isNotEmpty("Something"), expected);
    assert.deepStrictEqual(isNotEmpty("   A   "), expected);
  });

  it("should pass when `value` is a filled array.", () => {
    const expected = bodySchema(false, defaultLabel, defaultMsg);
    assert.deepStrictEqual(isNotEmpty(["A"]), expected);
    assert.deepStrictEqual(isNotEmpty([1]), expected);
    assert.deepStrictEqual(isNotEmpty([{}]), expected);
  });

  it("should pass when `value` is an object with keys.", () => {
    const expected = bodySchema(false, defaultLabel, defaultMsg);
    assert.deepStrictEqual(isNotEmpty({ key: null }), expected);
    assert.deepStrictEqual(isNotEmpty({ key: 1 }), expected);
    assert.deepStrictEqual(isNotEmpty({ key: "" }), expected);
    assert.deepStrictEqual(isNotEmpty({ key: true }), expected);
  });
});
