const processRules = require("../utils/processRules");
const assert = require("assert");
const bodySchema = require("../lib/bodySchema");

describe("processRules", () => {
  it("should return errors when provides rules that result in errors.", () => {
    const rules = [
      bodySchema(true, "Value 1", "is required."),
      bodySchema(false, "Value 2", "is optional."),
      {
        field: "value3",
        failed: true,
        passed: false,
        error: "Value 3 is required.",
      },
      { field: "value4", failed: false, passed: true, error: null },
    ];
    const expected = {
      result: {
        value1: "Value 1 is required.",
        value3: "Value 3 is required.",
      },
      errors: [
        { error: "Value 1 is required.", field: "value1" },
        { error: "Value 3 is required.", field: "value3" },
      ],
    };
    const actual = processRules(rules);
    assert.deepStrictEqual(actual, expected);
  });

  it("should handle single rules.", () => {
    // Failing scenarios:
    let rule = bodySchema(true, "Main Customer Email", "has invalid format.");
    let expected = {
      result: {
        mainCustomerEmail: "Main Customer Email has invalid format.",
      },
      errors: [
        {
          error: "Main Customer Email has invalid format.",
          field: "mainCustomerEmail",
        },
      ],
    };
    let actual = processRules(rule);
    assert.deepStrictEqual(actual, expected);

    // Passing scenarios:
    rule = bodySchema(false, "Secondary Customer Email", "has invalid format.");
    expected = {
      result: {},
      errors: [],
    };
    actual = processRules(rule);
    assert.deepStrictEqual(actual, expected);
  });

  it("must have equal number of results and errors.", () => {
    const rules = [
      bodySchema(true, "Value 1", "is required."),
      bodySchema(false, "Value 2", "is optional."),
      bodySchema(true, "Value 3", "is optional."),
      bodySchema(false, "Value 4", "is optional."),
    ];
    const expected = 2;
    const results = processRules(rules);
    const actual1 = Object.keys(results.result).length;
    const actual2 = results.errors.length;
    assert.strictEqual(actual1, expected);
    assert.strictEqual(actual2, expected);
  });
});
