const bodySchema = require("./bodySchema");

/**
 * Checks if a number if greater than another.
 *
 * `failed` = true when the `actualNumber` is less than the `minNumber`.
 * @param {number} actualNumber - The actual number to be validated.
 * @param {number} minNumber - The minimum number permitted.
 * @param {string} label - (Default: "Value") A user-friendly label displayed in the error message to help identify the erroneous variable.
 * @param {string} msg - (Default: "is less than the minimum number") A user-friendly message in the error message to help identify the cause of the error.
 * @returns {{field: string, failed: boolean, passed: boolean, error: string}} The validation results.
 * @example
 *
 * isGreaterThan(5, 4)
 * // => true
 *
 * isGreaterThan(5, 5)
 * // => false
 *
 * isGreaterThan(5, 6)
 * // => false
 */
module.exports = function isGreaterThan(
  actualNumber,
  minNumber,
  label = "Value",
  msg = "is less than the minimum number"
) {
  // Validation.
  /// Ensure arguments are integers.
  if (Number.isInteger(actualNumber) === false)
    throw Error("actualNumber must be an integer");

  if (Number.isInteger(minNumber) === false)
    throw Error("minNumber must be an integer");

  let result = actualNumber <= minNumber;
  return bodySchema(result, label, msg);
};
