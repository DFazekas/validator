/**
 * Process a response object for all the failing rules.
 *
 * @param rules - The rules to process.
 * @returns {{result: {}, errors: ({field: (string|number|*), error}|null)[]}} - The processed response object.
 */
module.exports = function processRules(rules) {
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

  return { result, errors };
};
