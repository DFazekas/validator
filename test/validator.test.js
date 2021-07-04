const { validator } = require("../index");
const assert = require("assert");
const bodySchema = require("../lib/bodySchema");

const defaultLabel = "Valve";
const defaultMsg = "the cake is a lie";

describe("validator", () => {
  // Fail conditions:
  it("should fail with one property when `rules` is single failing rule.", () => {
    const failingRule = bodySchema(true, defaultLabel, defaultMsg);
    const actual = validator(failingRule);
    const expected = { valve: "Valve the cake is a lie" };
    assert.deepStrictEqual(actual, expected);
  });

  it("should fail with one property when `rules` is an array containing only one failing rule.", () => {
    const failingRule = bodySchema(true, defaultLabel, defaultMsg);
    const passingRule = bodySchema(false, defaultLabel, defaultMsg);
    const actual = validator([failingRule, passingRule]);
    const expected = { valve: "Valve the cake is a lie" };
    assert.deepStrictEqual(actual, expected);
  });

  it("should fail with N properties when `rules` contains N failing rules.", () => {
    const labels = ["One", "Two", "Three"];
    const failingRule1 = bodySchema(true, labels[0], defaultMsg);
    const failingRule2 = bodySchema(true, labels[1], defaultMsg);
    const failingRule3 = bodySchema(true, labels[2], defaultMsg);
    const actual = validator([failingRule1, failingRule2, failingRule3]);
    const expected = {
      one: `${labels[0]} ${defaultMsg}`,
      two: `${labels[1]} ${defaultMsg}`,
      three: `${labels[2]} ${defaultMsg}`,
    };
    assert.deepStrictEqual(actual, expected);
  });

  it("should throw error when `rules` is null.", () => {
    assert.throws(() => validator(null));
  });

  it("should throw error when `rules` is an empty array.", () => {
    assert.throws(() => validator([]));
  });

  it("should throw error when `rules` contains a rule with an incompatible response body.", () => {
    function invalidRule() {
      return { hasErr: true, errMsg: "Should throw error" };
    }
    assert.throws(() => validator([invalidRule()]));
  });

  // Pass conditions:
  it("should pass when `rules` is a single passing rule.", () => {
    const validResponse = bodySchema(false, defaultLabel, defaultMsg);
    const actual = validator(validResponse);
    const expected = {};
    assert.deepStrictEqual(actual, expected);
  });

  it("should pass when `rules` is an array containing a single passing rule.", () => {
    const validResponse = bodySchema(false, defaultLabel, defaultMsg);
    const actual = validator([validResponse]);
    const expected = {};
    assert.deepStrictEqual(actual, expected);
  });

  it("should pass when `rules` is an array containing N passing ruled.", () => {
    const labels = ["One", "Two", "Three"];
    const failingRule1 = bodySchema(false, labels[0], defaultMsg);
    const failingRule2 = bodySchema(false, labels[1], defaultMsg);
    const failingRule3 = bodySchema(false, labels[2], defaultMsg);
    const actual = validator([failingRule1, failingRule2, failingRule3]);
    const expected = {};
    assert.deepStrictEqual(actual, expected);
  });

  it("should not throw error when `rules` is an array of only compatible response bodies.", () => {
    const validResponse = bodySchema(false, defaultLabel, defaultMsg);
    assert.doesNotThrow(() => validator([validResponse]));
  });

  it("should not throw error when `rules` is a single compatible response body.", () => {
    const validResponse = bodySchema(false, defaultLabel, defaultMsg);
    assert.doesNotThrow(() => validator(validResponse));
  });
});
