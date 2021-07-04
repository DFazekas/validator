const isEmail = require("./lib/isEmail");
const isPhone = require("./lib/isPhone");
const isGreaterThan = require("./lib/isGreaterThan");
const bodySchema = require("./lib/bodySchema");
const isNotNullOrEmpty = require("./lib/isNotNullOrEmpty");

module.exports = {
  validator,
  isEmail,
  isPhone,
  isGreaterThan,
  isNotNullOrEmpty,
};

function validator(rules) {
  // Validation.
  /// Ensure rules is not null or empty.
  if (rules == null || (Array.isArray(rules) && rules.length === 0))
    throw Error("Rules cannot be null or empty.");

  /// Ensure all rules return an object that matches the schema.
  if (validateSchema(rules) === false) {
    throw Error(
      "Some of the rules do not return the required response schema."
    );
  }

  // Convert `rules` into an array.
  let _rules = Array.isArray(rules) ? rules : [rules];

  // Filter out all passing rules, extracting the error messages.
  let errors = _rules
    .map((rule) => {
      if (rule.hasErr) return { field: rule.field, msg: rule.errMsg };
    }, [])
    .filter((e) => e);

  // Transmute into an optimized format.
  let result = {};
  errors.forEach((err) => (result[err.field] = err.msg));
  return result;
}

function validateSchema(rules) {
  let _rules = Array.isArray(rules) ? rules : [rules];

  const expected = bodySchema("", "", "");
  _rules.push(expected);

  // Reduce the array of rules into a set of unique keys from all the rules.
  const allKeys = _rules.reduce(
    (keys, object) => keys.concat(Object.keys(object)),
    []
  );
  const union = new Set(allKeys);

  // Verify each object contains the same number of keys as the set of all unique keys.
  return _rules.every((object) => union.size === Object.keys(object).length);
}
