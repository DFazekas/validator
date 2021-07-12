const validateSchema = require("./utils/validateSchema");
const processRules = require("./utils/processRules");
const isEmail = require("./lib/isEmail");
const isPhone = require("./lib/isPhone");
const isGreaterThan = require("./lib/isGreaterThan");
const bodySchema = require("./lib/bodySchema");
const isNotEmpty = require("./lib/isNotEmpty");

module.exports = {
  validator,
  isEmail,
  isPhone,
  isGreaterThan,
  isNotEmpty,
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
