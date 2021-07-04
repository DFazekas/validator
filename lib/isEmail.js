const bodySchema = require("./bodySchema");

/**
 * Checks if an email has a valid format.
 *
 * `hasErr` = true when the an email does not have a valid format.
 * @param {string} email - The email being validated.
 * @param {string} label - (Default: "Email") A user-friendly label displayed in the error message to help identify the erroneous variable.
 * @param {string} msg - (Default: "format is not valid") A user-friendly message in the error message to help identify the cause of the error.
 * @returns {{hasErr: Boolean, errMsg: (String | null)}} The validation results.
 * @example
 *
 * isEmail('test@email.com')
 * // => true
 *
 * isEmail('notEmail')
 * // => false
 */
module.exports = function isEmail(
  email,
  label = "Email",
  msg = "format is not valid"
) {
  // Validation.
  /// Ensure argument is type string.
  if (typeof email !== "string") throw Error("Argument must be type string");

  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const hasErr = !re.test(String(email).toLowerCase());
  return bodySchema(hasErr, label, msg);
};
