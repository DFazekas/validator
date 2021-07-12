const bodySchema = require("./bodySchema");

/**
 * Checks if a phone number has a valid format.
 *
 * `failed` = true when the phone number does not have a valid format.
 * @param {string} phone - The phone number being validated.
 * @param {string} label - (Default: "Phone") A user-friendly label displayed in the error message to help identify the erroneous variable.
 * @param {string} msg - (Default: "format is not valid") A user-friendly message in the error message to help identify the cause of the error.
 * @returns {{field: string, failed: boolean, passed: boolean, error: string}} The validation results.
 * @example
 *
 * isPhone('+1 555-555-5555')
 * // => true
 *
 * isPhone('555*555*5555')
 * // => false
 */
module.exports = function isPhone(
  phone,
  label = "Phone",
  msg = "format is not valid"
) {
  // Validation.
  /// Ensure argument is type string.
  if (typeof phone !== "string")
    throw Error(`isPhone(${label}) - Argument must be type string`);

  const re = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  const hasErr = !re.test(phone);
  return bodySchema(hasErr, label, msg);
};
