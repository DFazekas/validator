module.exports = { camelCase };

/**
 * Camel cases the input.
 *
 * Special symbols and whitespaces are removed from the input.
 * @param {*} input - The input to camel case.
 * @returns {string} - The camel cased string.
 * @example
 *
 * "Dr John Doe"
 * // => "drJohnDoe"
 *
 * "The 5 guys"
 * // => "the5Guys"
 *
 * "Joe McCabe"
 * // => "joeMcCabe"
 */
function camelCase(input) {
  let words = toWords(input);
  return toCamelCase(words);
}

/**
 * Splits the input into words.
 *
 * Converts the input into a string then splits it into an array of words.
 * @param {*} input - The input to transform.
 * @returns {RegExpMatchArray} - The array of words.
 */
function toWords(input) {
  input = convertToString(input);
  let regex =
    /[A-Z\xC0-\xD6\xD8-\xDE]?[a-z\xDF-\xF6\xF8-\xFF]+|[A-Z\xC0-\xD6\xD8-\xDE]+(?![a-z\xDF-\xF6\xF8-\xFF])|\d+/g;
  return input.match(regex) || [];
}

/**
 * Stringifies the input.
 *
 * @param {*} input - The input to stringify.
 * @returns {string} - The new string.
 */
function convertToString(input) {
  if (input) {
    if (typeof input === "string") return input;
    return String(input);
  }
  return "";
}

/**
 * Concatenates an array of words into a camelCase styled string.
 * @param {[string]} inputArray - The array of words to stylize.
 * @returns {string} - The camelCased string.
 */
function toCamelCase(inputArray) {
  let result = "";

  for (let i = 0, len = inputArray.length; i < len; i++) {
    let currentStr = inputArray[i];
    let tempStr = currentStr.toLowerCase();

    // Convert first letter to upper case (the word is in lowercase).
    if (i !== 0)
      tempStr = tempStr.substr(0, 1).toUpperCase() + tempStr.substr(1);

    result += tempStr;
  }

  return result;
}
