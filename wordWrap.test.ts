import { wrapWords } from "./customWordWrap";

// Spec: should wrap words at a given maxLength and until maxHeight lines are reached
// - Should return an array of strings or string, depending on if string length exceeds maxLength
// - The returned array should have strings that don't exceed maxLength
// - The returned array's length should not exceed maxHeight
// - Each string should contain the max possible words without exceeding maxLength
// - Each string should contain spaces between words, but no leading or trailing spaces
// - If a single word is longer than maxLength, it should be split up between rows
// - If a string contains newline characters, it should preserve the functionality by splitting the preceding and following string at that point, but removing the newline char
// - If a string contains consecutive newline characters \n, it should treat the first one as stated above ^ and the following newlines become rows with empty strings: ""
// - If a string contains carriage returns \r, they should be ignored
// - If a string contains consecutive spaces, they should be preserved only if they appear between words on a line. If they should start or end a line, then discard them
// - If a string contains emojis, then count each emoji as a single word (consecutive emojis can be broken up as if individual words)
// - If a string contains emojis, then count the length of each emoji as 2 (this is the default rendered width on my terminal, but could be parametrized)
// - If a string contains emojis, a single emoji's unicode should not be broken by wrapping (many Emoji's are made up of multiple groups of unicode)

// Edge cases:
// - If a string is empty, then just return the string
// - maxLength and maxHeight must be integers
// - maxLength must be greater than 0
// - maxHeight must be greater than 0

// 6 + space + 4 + space + 2 + space + 1 + space + 4
const testStr = "Hello, this is a test"; // 21

describe("wordWrap", () => {
  it("Should limit the strings to a max width", () => {
    const maxLength = 7;
    const wrapped = wrapWords(testStr, maxLength, Infinity);
    expect(wrapped).toBeInstanceOf(Array);
    if (!Array.isArray(wrapped)) return;

    const lengths = wrapped.map((str) => str.length);
    lengths.forEach((length) => expect(length).toBeLessThanOrEqual(maxLength));
  });
});
