const validateSchema = require("../utils/validateSchema");
const bodySchema = require("../lib/bodySchema");
const assert = require("assert");

describe("validateSchema", () => {
  it("should throw an error when provided objects with invalid values types.", () => {
    const rules = [
      { field: "", failed: false, passed: true, error: null },
      { field: 4, failed: false, passed: true, error: null },
      { field: "", failed: 4, passed: true, error: null },
      { field: "", failed: false, passed: 4, error: null },
      { field: "", failed: false, passed: true, error: 4 },
    ];
    // noinspection JSCheckFunctionSignatures
    assert.throws(
      () => validateSchema(rules),
      TypeError("Rule [1]: `field` property must be of type string.")
    );
    // noinspection JSCheckFunctionSignatures
    assert.throws(
      () => validateSchema(rules[1]),
      TypeError("Rule [0]: `field` property must be of type string.")
    );
    // noinspection JSCheckFunctionSignatures
    assert.throws(
      () => validateSchema(rules[2]),
      TypeError(
        "Rule [0]: `failed` and `passed` properties must have equal types."
      )
    );
    // noinspection JSCheckFunctionSignatures
    assert.throws(
      () => validateSchema(rules[3]),
      TypeError(
        "Rule [0]: `failed` and `passed` properties must have equal types."
      )
    );
    // noinspection JSCheckFunctionSignatures
    assert.throws(
      () => validateSchema(rules[4]),
      TypeError(
        "Rule [0]: `error` property must either be null or of type string."
      )
    );
  });

  it("should throw an error when provided objects with contradicting values.", () => {
    const rules = [
      { field: "pass", failed: true, passed: false, error: "" },
      { field: "error", failed: false, passed: false, error: null },
      { field: "error", failed: true, passed: false, error: null },
    ];
    assert.throws(
      () => validateSchema(rules),
      TypeError(
        "Rule [1]: `failed` and `passed` properties cannot have equal values."
      )
    );
    assert.throws(
      () => validateSchema(rules[1]),
      TypeError(
        "Rule [0]: `failed` and `passed` properties cannot have equal values."
      )
    );
    assert.throws(
      () => validateSchema(rules[2]),
      TypeError(
        "Rule [0]: `error` property cannot be null when `failed` property is equal to true."
      )
    );
  });

  it("should pass when provided proper response objects.", () => {
    const rules = [
      bodySchema(true, "Value 1", "is required."),
      bodySchema(false, "Value 2", "is required."),
      bodySchema(false, "", ""),
      { field: "", failed: false, passed: true, error: null },
      {
        field: "value3",
        failed: true,
        passed: false,
        error: "Value 3 is required.",
      },
    ];
    assert.deepStrictEqual(validateSchema(rules[0]), true);
    assert.deepStrictEqual(validateSchema(rules[1]), true);
    assert.deepStrictEqual(validateSchema(rules[2]), true);
    assert.deepStrictEqual(validateSchema(rules[3]), true);
    assert.deepStrictEqual(validateSchema(rules[4]), true);
  });
});
