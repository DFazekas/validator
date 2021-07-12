const { camelCase } = require("../utils/camelCase");

/**
 * A schema that all rules must return.
 *
 * @param {boolean} hasErr - Indicates that the rule failed.
 * @param {string} label - A user-friendly display name for the variable validated against the rules.
 * @param {string} msg - A user-friendly explanation of why a rule failed.
 * @returns {{field: string, failed: boolean, passed: boolean, error: string}}
 */
module.exports = function bodySchema(hasErr, label = "", msg = "") {
  return {
    field: camelCase(label),
    failed: hasErr,
    passed: !hasErr,
    error: `${label} ${msg}`,
  };
};
