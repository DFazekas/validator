const bodySchema = require("./bodySchema");

/**
 * Checks if a value is not null or empty.
 *
 * `failed` = true when the `value` is null or empty.
 * @param {any} value - The value being validated.
 * @param {string} label - (Default: "Value") A user-friendly label displayed in the error message to help identify the erroneous variable.
 * @param {string} msg - (Default: "cannot be null or empty") A user-friendly message in the error message to help identify the cause of the error.
 * @returns {{field: string, failed: boolean, passed: boolean, error: string}} The validation results.
 * @example
 *
 * isNotEmpty('abc')
 * // => true
 *
 * isNotEmpty(123)
 * // => true
 *
 * isNotEmpty([1, 2, 3])
 * // => true
 *
 * isNotEmpty({'key': 'value'})
 * // => true
 *
 * isNotEmpty([])
 * // => false
 *
 * isNotEmpty({})
 * // => false
 */
module.exports = function isNotEmpty(
  value,
  label = "Value",
  msg = "cannot be null or empty"
) {
  let hasErr = false;
  if (value == null) hasErr = true;
  else if (typeof value === "string") hasErr = value.trim().length === 0;
  else if (Array.isArray(value)) hasErr = value.length === 0;
  else if (typeof value === "object") hasErr = Object.keys(value).length === 0;

  return bodySchema(hasErr, label, msg);
};
