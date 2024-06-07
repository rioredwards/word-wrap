import { wrapWords } from "./wordWrap";

// Spec: should wrap words at a given maxLength and until maxHeight lines are reached
// ✅ Should return a string if string length is less than or equal to maxLength
// ✅ Should return an array of strings if string length exceeds maxLength
// ✅ The returned array should have strings that don't exceed maxLength
// ✅ The returned array's length should not exceed maxHeight
// ✅ (Implied, not tested for) Each string should contain the max possible words without exceeding maxLength
// ✅ Each string should contain spaces between words, but no leading or trailing spaces
// ✅ If a single word is longer than maxLength, it should be split up between rows
// ✅ If a string contains newline characters, it should preserve the functionality by splitting the preceding and following string at that point, but removing the newline char
// - If a string contains consecutive newline characters \n, it should treat the first one as stated above ^ and the following newlines become rows with empty strings: ""
// - If a string contains carriage returns \r, they should be ignored
// - If a string contains consecutive spaces, they should be preserved only if they appear between words on a line. If they should start or end a line, then discard them
// - If a string contains emojis, then count each emoji as a single word (consecutive emojis can be broken up as if individual words)
// - If a string contains emojis, then count the length of each emoji as 2 (this is the default rendered width on my terminal, but could be parametrized)
// - If a string contains emojis, a single emoji's unicode should not be broken by wrapping (many Emoji's are made up of multiple groups of unicode)

// Edge cases:
// - str should be a string
// - If a string is empty, then just return the string
// - maxLength and maxHeight must be integers
// - maxLength must be greater than 0
// - maxHeight must be greater than 0
// - maxLength could be 1
// - maxHeight could be 1

describe("wordWrap", () => {
  it("Should return a string if string length is less than or equal to maxLength", () => {
    const string = "Test";
    const result1 = wrapWords(string, string.length + 1, Infinity);
    expect(typeof result1).toBe("string");

    const result2 = wrapWords(string, string.length, Infinity);
    expect(typeof result2).toBe("string");
  });
  it("Should return an array of strings if string length exceeds maxLength", () => {
    // 6 + space + 4 + space + 2 + space + 1 + space + 4
    const testStr = "Hello, this is a test"; // 21
    const maxLength = 7;
    const wrapped = wrapWords(testStr, maxLength, Infinity);
    expect(wrapped).toBeInstanceOf(Array<number>);
  });
  describe("The returned array should have strings that don't exceed maxLength", () => {
    it("when maxLength is 1", () => {
      // 6 + space + 4 + space + 2 + space + 1 + space + 4
      const testStr = "Hello, this is a test"; // 21
      const maxLength = 1;
      const wrapped = wrapWords(testStr, maxLength, Infinity) as Array<string>;

      const lengths = wrapped.map((str) => str.length);
      lengths.forEach((length) => expect(length).toBeLessThanOrEqual(maxLength));
    });
    it("when maxLength is not 1", () => {
      // 6 + space + 4 + space + 2 + space + 1 + space + 4
      const testStr = "Hello, this is a test"; // 21
      const maxLength = 7;
      const wrapped = wrapWords(testStr, maxLength, Infinity) as Array<string>;

      const lengths = wrapped.map((str) => str.length);
      lengths.forEach((length) => expect(length).toBeLessThanOrEqual(maxLength));
    });
  });
  describe("If a single word is longer than maxLength, it should be split up between rows", () => {
    it("When the input is just a single word", () => {
      const testStr = "This_is_a_long_word";
      const expectedArr = ["This", "_is_", "a_lo", "ng_w", "ord"];
      const maxLength = 4;
      const wrapped = wrapWords(testStr, maxLength, Infinity);
      expect(wrapped).toEqual(expectedArr);
    });
    it("When the input is a mix of longer and shorter words", () => {
      const testStr = "This is a sentence_with some longer_words";
      const expectedArr = [
        "This",
        "is a",
        "sent",
        "ence",
        "_wit",
        "h",
        "some",
        "long",
        "er_w",
        "ords",
      ];
      const maxLength = 4;
      const wrapped = wrapWords(testStr, maxLength, Infinity);
      expect(wrapped).toEqual(expectedArr);
    });
  });
  describe("The returned array should have a height that doesn't exceed maxHeight", () => {
    it("when maxHeight is 1", () => {
      // 6 + space + 4 + space + 2 + space + 1 + space + 4
      const testStr = "Hello, this is a test"; // 21
      const maxHeight = 1;
      const wrapped = wrapWords(testStr, 7, maxHeight) as Array<string>;

      expect(wrapped.length).toBe(1);
    });
    it("when maxHeight is not 1", () => {
      // 6 + space + 4 + space + 2 + space + 1 + space + 4
      const testStr = "Hello, this is a test"; // 21
      const maxHeight = 4;
      const wrapped = wrapWords(testStr, 3, maxHeight) as Array<string>;

      expect(wrapped.length).toBe(4);
    });
  });
  it("Each string should contain no leading or trailing spaces", () => {
    const testStr = "Hello, this is a test with a little bit more content, just to be extra sure.";
    const maxLength = 7;
    const wrapped = wrapWords(testStr, maxLength, Infinity) as Array<string>;
    wrapped.forEach((string) => {
      expect(string.at(0)).not.toBe(" ");
      expect(string.at(-1)).not.toBe(" ");
    });
  });
  it("Each string should contain spaces between words", () => {
    // 6 + space + 4 + space + 2 + space + 1 + space + 4
    const testStr = "Hello, this is a test"; // 21
    const expected = [
      "Hello,",
      "this is", // <- space at [1][4]
      "a test", // <- space at [2][1]
    ];
    const maxLength = 7;
    const wrapped = wrapWords(testStr, maxLength, Infinity) as Array<string>;

    expect(wrapped).toEqual(expected);
    expect(wrapped[1][4]).toBe(" ");
    expect(wrapped[2][1]).toBe(" ");
  });
  it("should preserve the functionality of newline chars by splitting the string at that point, but removing the newline char", () => {
    const testStr = "Hello,\n this is\n a test";
    const expected = [
      "Hello,", // <- split because of newline
      "this is", // <- split because of newline
      "a test",
    ];
    const wrapped = wrapWords(testStr, Infinity, Infinity) as Array<string>;

    wrapped.forEach((string) => expect(string.includes("\n")).toBe(false));
    expect(wrapped).toEqual(expected);
  });
  it("should handle consecutive newlines by creating lines with empty strings", () => {
    const testStr = "Hello,\n\n\n this is\n a test";
    const expected = [
      "Hello,", // <- split because of newline
      "", // <- split because of newline
      "", // <- split because of newline
      "this is", // <- split because of newline
      "a test",
    ];
    const wrapped = wrapWords(testStr, Infinity, Infinity) as Array<string>;

    wrapped.forEach((string) => expect(string.includes("\n")).toBe(false));
    expect(wrapped).toEqual(expected);
  });
});
