const { isEmail } = require("../index");
const assert = require("assert");
const bodySchema = require("../lib/bodySchema");

describe("isEmail", () => {
  // Fail conditions:
  it("should fail when `email` is poorly formatted.", () => {
    const expected = bodySchema(true, "Email", "format is not valid");
    assert.deepStrictEqual(isEmail(""), expected);
    assert.deepStrictEqual(isEmail("testtest.com"), expected);
    assert.deepStrictEqual(isEmail("test@testcom"), expected);
    assert.deepStrictEqual(isEmail("test@@test.com"), expected);
  });

  it("should throw error when arguments are not type string.", () => {
    // noinspection JSCheckFunctionSignatures
    assert.throws(() => isEmail(4));
    // noinspection JSCheckFunctionSignatures
    assert.throws(() => isEmail(false));
  });

  // Pass conditions:
  it("should pass when `email` is properly formatted.", () => {
    const expected = bodySchema(false, "Email", "format is not valid");
    assert.deepStrictEqual(isEmail("test@test.com"), expected);
    assert.deepStrictEqual(isEmail("test123@test123.ca"), expected);
  });
});
