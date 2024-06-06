import { wrapWords } from "./customWordWrap";

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
