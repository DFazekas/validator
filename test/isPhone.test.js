const { isPhone } = require("../index");
const assert = require("assert");
const bodySchema = require("../lib/bodySchema");

const defaultLabel = "Phone";
const defaultMsg = "format is not valid";

describe("isPhone", () => {
  // Fail conditions:
  it("should fail when `phone` is poorly formatted.", () => {
    const expected = bodySchema(true, defaultLabel, defaultMsg);
    assert.deepStrictEqual(isPhone(""), expected);
    assert.deepStrictEqual(isPhone("111"), expected);
    assert.deepStrictEqual(isPhone("123a4567890"), expected);
    assert.deepStrictEqual(isPhone("test@@test.com"), expected);
    assert.deepStrictEqual(isPhone("555_555_5555"), expected);
    assert.deepStrictEqual(isPhone("+123 555 555 5555"), expected);
    assert.deepStrictEqual(isPhone("555^555 5555"), expected);
  });

  it("should throw error when arguments are not type string.", () => {
    assert.throws(() => isPhone(4));
    assert.throws(() => isPhone(false));
  });

  // Pass conditions:
  it("should pass when `phone` is properly formatted.", () => {
    const expected = bodySchema(false, defaultLabel, defaultMsg);
    assert.deepStrictEqual(isPhone("5555555555"), expected);
    assert.deepStrictEqual(isPhone("(555) 555 5555"), expected);
    assert.deepStrictEqual(isPhone("555-555-5555"), expected);
    assert.deepStrictEqual(isPhone("555.555.5555"), expected);
    assert.deepStrictEqual(isPhone("555 555 5555"), expected);
    assert.deepStrictEqual(isPhone("+1 555 555 5555"), expected);
  });
});
