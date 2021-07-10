module.exports = function bodySchema(hasErr, label = "", msg = "") {
  return {
    field: camelCase(label),
    failed: hasErr,
    passed: !hasErr,
    error: hasErr ? `${label} ${msg}` : null,
  };
};

/**
 * Converts `word` to camel case.
 *
 * @param {string} word - The string to convert.
 * @returns {string} Returns the camel cased string.
 */
function camelCase(word) {
  return word.replace(/^\w|[A-Z]|\b\w|\s+/g, (match, index) => {
    if (+match === 0) return "";
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });
}
