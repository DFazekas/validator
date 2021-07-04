module.exports = function bodySchema(result, label = "", msg = "") {
  return {
    field: camelCase(label),
    hasErr: result,
    noErr: !result,
    errMsg: result ? `${label} ${msg}` : null,
  };
};

/**
 * Converts `word` to camel case.
 *
 * @param {string} word - The string to convert.
 * @returns {string} Returns the camel cased string.
 */
function camelCase(word) {
  return word.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
    if (+match === 0) return "";
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });
}
