const bodySchema = require("../lib/bodySchema");

/**
 * Checks that all provided rules return the required `bodySchema`.
 * @param {[{field: string, failed: boolean, passed: boolean, error: (string|null)}]|{field: string, failed: boolean, passed: boolean, error: (string|null)}} rules - The rules to be validated.
 */
module.exports = function validateSchema(rules) {
  // Throw error if empty or null.
  if (rules == null || (Array.isArray(rules) && rules.length === 0))
    throw TypeError("Rules cannot be null or empty.");

  // Clone `rules` to prevent mutation.
  let _rules = Array.isArray(rules) ? [...rules] : [rules];

  const expected = bodySchema(false, "", "");
  _rules.push(expected);

  // Reduce the array of rules into a set of unique keys from all the rules.
  const allKeys = _rules.reduce(
    (keys, object) => keys.concat(Object.keys(object)),
    []
  );
  // noinspection JSCheckFunctionSignatures
  const union = new Set(allKeys);

  // Verify each object contains the same number of keys as the set of all unique keys.
  /// Any more or less indicates a mismatch, meaning an invalid structure.
  const hasEqualKeys = _rules.every(
    (object) => union.size === Object.keys(object).length
  );
  if (hasEqualKeys === false)
    throw TypeError("One or more rules return an invalid response object.");

  // Type-check rule response values:
  /// [field] must be string.
  /// [failed] must be boolean.
  /// [passed] must be boolean.
  /// [error] can be either string or null.
  _rules.forEach((object, index) => {
    if (typeof object.field !== "string")
      throw TypeError(
        `Rule [${index}]: \`field\` property must be of type string.`
      );
    if (typeof object.failed !== typeof object.passed)
      throw TypeError(
        `Rule [${index}]: \`failed\` and \`passed\` properties must have equal types.`
      );
    if (typeof object.failed !== "boolean")
      throw TypeError(
        `Rule [${index}]: \`failed\` property must be of type string.`
      );
    if (typeof object.error !== "string" && object.error != null)
      throw TypeError(
        `Rule [${index}]: \`error\` property must either be null or of type string.`
      );
  });

  // Validate against contradicting values:
  /// When [failed] = true, [error] cannot be null.
  /// [failed] !== [passed].
  _rules.forEach((object, index) => {
    if (object.failed === true && object.error == null)
      throw TypeError(
        `Rule [${index}]: \`error\` property cannot be null when \`failed\` property is equal to true.`
      );
    if (object.failed === object.passed)
      throw TypeError(
        `Rule [${index}]: \`failed\` and \`passed\` properties cannot have equal values.`
      );
  });

  return true;
};
