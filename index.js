const isEmail = require("./lib/isEmail");
const isGreaterThan = require("./lib/isGreaterThan");
const bodySchema = require("./lib/bodySchema");
const isNotNullOrEmpty = require("./lib/isNotNullOrEmpty");

module.exports = {
  validator,
  isEmail,
  isGreaterThan,
  isNotNullOrEmpty,
};

function validator(rules) {
  // Validate - Schema of the rules.
  if (validateSchema(rules) === false) {
    throw Error(
      "Some of the rules do not return the required response schema."
    );
  }

  //TODO: Allow `rules` to be a single function.

  // Assume `rules` is an array of functions.
  // Filter out all passing rules, extracting the error messages.
  let errors = rules
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
  const expected = bodySchema("", "", "");
  rules.push(expected);

  // Reduce the array of rules into a set of unique keys from all the rules.
  const allKeys = rules.reduce(
    (keys, object) => keys.concat(Object.keys(object)),
    []
  );
  const union = new Set(allKeys);

  // Verify each object contains the same number of keys as the set of all unique keys.
  return rules.every((object) => union.size === Object.keys(object).length);
}
