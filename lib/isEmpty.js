const bodySchema = require("./bodySchema");

/**
 * Checks if a value is null or empty.
 *
 * `failed` = true when the `value` is not null or empty.
 * @param {any} value - The value being validated.
 * @param {string} label - (Default: "Value") A user-friendly label displayed in the error message to help identify the erroneous variable.
 * @param {string} msg - (Default: "must be null or empty") A user-friendly message in the error message to help identify the cause of the error.
 * @returns {{field: string, failed: boolean, passed: boolean, error: string}} The validation results.
 * @example
 *
 * isEmpty('abc')
 * // => false
 *
 * isEmpty(123)
 * // => false
 *
 * isEmpty([1, 2, 3])
 * // => false
 *
 * isEmpty({'key': 'value'})
 * // => false
 *
 * isEmpty([])
 * // => true
 *
 * isEmpty({})
 * // => true
 *
 * isEmpty('')
 * // => true
 */
module.exports = function isEmpty(
  value,
  label = "Value",
  msg = "must be null or empty"
) {
  let hasErr = false;
  if (value == null) hasErr = false;
  else if (typeof value === "string") hasErr = value.trim().length !== 0;
  else if (Array.isArray(value)) hasErr = value.length !== 0;
  else if (typeof value === "object") hasErr = Object.keys(value).length !== 0;

  return bodySchema(hasErr, label, msg);
};
