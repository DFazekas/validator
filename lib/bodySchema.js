const { camelCase } = require("../utils/camelCase");

module.exports = function bodySchema(hasErr, label = "", msg = "") {
  return {
    field: camelCase(label),
    failed: hasErr,
    passed: !hasErr,
    error: hasErr ? `${label} ${msg}` : null,
  };
};
