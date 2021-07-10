const { camelCase } = require("../utils/camelCase");
const assert = require("assert");

describe("camelCase", () => {
  it("should return empty string when passed an empty string or only special characters.", () => {
    const expected = "";
    assert.strictEqual(camelCase(""), expected);
    assert.strictEqual(camelCase("     "), expected);
    assert.strictEqual(camelCase("  .,!?   "), expected);
  });

  it("should pass when given a string containing three words.", () => {
    const expected = "drJohnDoe";
    assert.strictEqual(camelCase("Dr John Doe"), expected);
    assert.strictEqual(camelCase("dr john doe"), expected);
    assert.strictEqual(camelCase("dr   john   doe"), expected);
  });

  it("should pass when given a string containing symbols.", () => {
    const expected = "drJohnDoe";
    assert.strictEqual(camelCase("Dr! John Doe"), expected);
    assert.strictEqual(camelCase("dr john. @doe"), expected);
    assert.strictEqual(camelCase("dr?   john,   doe"), expected);
  });

  it("should pass when given string containing numbers.", () => {
    const expected = "foo24Bar";
    assert.strictEqual(camelCase("foo 2 4 bar"), expected);
    assert.strictEqual(camelCase("foo2 4bar"), expected);
    assert.strictEqual(camelCase("Foo24Bar"), expected);
  });

  it("should pass when given non-string inputs.", () => {
    assert.strictEqual(camelCase(true), "true");
    assert.strictEqual(camelCase(1234), "1234");
    assert.strictEqual(camelCase(["John Doe", "john doe"]), "johnDoeJohnDoe");
  });
});
