import { classifyState } from "../src/classifyState";
import { Grapheme } from "../src/Grapheme";
import { Line } from "../src/Line";
import { Word } from "../src/Word";

// Helpers
function newWordOfLength(length: number) {
  const grapheme = new Grapheme("A");
  const graphemes = Array.from({ length }, () => grapheme);
  return new Word(graphemes);
}

function newLineOfLength(length: number) {
  const word = newWordOfLength(length);
  return new Line([word]);
}

// Tests
describe("classifyState", () => {
  const grapheme = new Grapheme("A");

  it("should return the correct state for: true_true_true_true", () => {
    // State 1: wordExists: ✅ | lineExists: ✅ | canFitChar: ✅ | canFitWord: ✅
    const word = newWordOfLength(1);
    const line = newLineOfLength(1);
    const stateStr = classifyState(grapheme, word, line, Infinity);
    expect(stateStr).toBe("true_true_true_true");
  });
  it("should return the correct state for: false_true_true_true", () => {
    // State 2: wordExists: 🚫 | lineExists: ✅ | canFitChar: ✅ | canFitWord: ✅
    const word = newWordOfLength(0);
    const line = newLineOfLength(1);
    const stateStr = classifyState(grapheme, word, line, Infinity);
    expect(stateStr).toBe("false_true_true_true");
  });
  it("should return the correct state for: true_false_true_true", () => {
    // State 3: wordExists: ✅ | lineExists: 🚫 | canFitChar: ✅ | canFitWord: ✅
    const word = newWordOfLength(1);
    const line = newLineOfLength(0);
    const stateStr = classifyState(grapheme, word, line, Infinity);
    expect(stateStr).toBe("true_false_true_true");
  });
  it("should return the correct state for: false_false_true_true", () => {
    // State 4: wordExists: 🚫 | lineExists: 🚫 | canFitChar: ✅ | canFitWord: ✅
    const word = newWordOfLength(0);
    const line = newLineOfLength(0);
    const stateStr = classifyState(grapheme, word, line, Infinity);
    expect(stateStr).toBe("false_false_true_true");
  });
  it("should return the correct state for: true_false_false_true", () => {
    // State 5: wordExists: ✅ | lineExists: 🚫 | canFitChar: 🚫 | canFitWord: ✅
    const word = newWordOfLength(1);
    const line = newLineOfLength(0);
    const stateStr = classifyState(grapheme, word, line, 1);
    expect(stateStr).toBe("true_false_false_true");
  });
  it("should return the correct state for: true_true_true_false", () => {
    // State 6: wordExists: ✅ | lineExists: ✅ | canFitChar: ✅ | canFitWord: 🚫
    const word = newWordOfLength(1);
    const line = newLineOfLength(2);
    const stateStr = classifyState(grapheme, word, line, 2);
    expect(stateStr).toBe("true_true_true_false");
  });
  it("should return the correct state for: true_true_false_false", () => {
    // State 7: wordExists: ✅ | lineExists: ✅ | canFitChar: 🚫 | canFitWord: 🚫
    const word = newWordOfLength(2);
    const line = newLineOfLength(2);
    const stateStr = classifyState(grapheme, word, line, 2);
    expect(stateStr).toBe("true_true_false_false");
  });
});
