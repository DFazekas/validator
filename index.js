const validateSchema = require("./utils/validateSchema");
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

  // Convert `rules` into an array.
  let _rules = Array.isArray(rules) ? [...rules] : [rules];

  // Filter out all passing rules, extracting the error messages.
  let result = {};
  let errors = _rules
    .map((rule) => {
      return rule.failed ? { field: rule.field, error: rule.error } : null;
    }, [])
    .filter((e) => e);
  errors.forEach((rule) => (result[rule.field] = rule.error));

  return { hasErr: errors.length > 0, errors: result };
}
