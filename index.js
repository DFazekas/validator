const validateSchema = require("./utils/validateSchema");
const processRules = require("./utils/processRules");
const isEmail = require("./lib/isEmail");
const isPhone = require("./lib/isPhone");
const isGreaterThan = require("./lib/isGreaterThan");
const bodySchema = require("./lib/bodySchema");
const isNotEmpty = require("./lib/isNotEmpty");
const isEmpty = require("./lib/isEmpty");

module.exports = {
  validator,
  isEmail,
  isPhone,
  isGreaterThan,
  isNotEmpty,
  isEmpty,
  bodySchema,
};

/**
 *
 * @param {{field: string, failed: boolean, passed: boolean, error: (string|null)}[]|{field: string, failed: boolean, passed: boolean, error: (string|null)}} rules
 * @returns {{errors: {}, hasErr: boolean}}
 */
function validator(rules) {
  // Ensure all rules return an object that matches the schema.
  validateSchema(rules);

  const { result, errors } = processRules(rules);
  return { hasErr: errors.length > 0, errors: result };
}
