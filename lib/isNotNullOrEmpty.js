const bodySchema = require("./bodySchema");

module.exports = function isNotNullOrEmpty(
  value,
  label = "Value",
  msg = "cannot be null or empty"
) {
  let hasErr = false;
  if (value == null) hasErr = true;
  else if (typeof value === "string") hasErr = value.trim().length === 0;
  else if (Array.isArray(value)) hasErr = value.length === 0;
  else if (typeof value === "object") hasErr = Object.keys(value).length === 0;

  return bodySchema(hasErr, label, msg);
};
