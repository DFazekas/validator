const { isGreaterThan } = require("../index");
const assert = require("assert");
const bodySchema = require("../lib/bodySchema");

const defaultLabel = "Value";
const defaultMsg = "is less than the minimum number";

describe("isGreaterThan", () => {
  // Fail conditions:
  it("should fail when `actualNumber` is less than or equal to the `minNumber`.", () => {
    const expected = bodySchema(true, defaultLabel, defaultMsg);
    assert.deepStrictEqual(isGreaterThan(-5, 5), expected);
    assert.deepStrictEqual(isGreaterThan(5, 5), expected);
    assert.deepStrictEqual(isGreaterThan(5, 8), expected);
  });

  it("should throw error when arguments are not type integer.", () => {
    // noinspection JSCheckFunctionSignatures
    assert.throws(() => isGreaterThan("a", 2));
    // noinspection JSCheckFunctionSignatures
    assert.throws(() => isGreaterThan(1, "b"));
    // noinspection JSCheckFunctionSignatures
    assert.throws(() => isGreaterThan("a", "b"));
  });

  // Pass conditions:
  it("should pass when `actualNumber` is greater than the `minNumber`.", () => {
    const expected = bodySchema(false, defaultLabel, defaultMsg);
    assert.deepStrictEqual(isGreaterThan(-5, -10), expected);
    assert.deepStrictEqual(isGreaterThan(5, 4), expected);
  });
});
