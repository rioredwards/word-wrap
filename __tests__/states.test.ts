import { classifyState } from "../src/classifyState";
import { Grapheme } from "../src/Grapheme";
import { generateState } from "./__mocks__/states.mock";

// Tests
describe("classifyState", () => {
  const grapheme = new Grapheme("A");

  it("should return the correct state for: true_true_true_true", () => {
    // State 1: wordExists: ✅ | lineExists: ✅ | canFitChar: ✅ | canFitWord: ✅
    const state = generateState(grapheme, "true_true_true_true");
    const stateStr = classifyState(state);
    expect(stateStr).toBe("true_true_true_true");
  });
  it("should return the correct state for: false_true_true_true", () => {
    // State 2: wordExists: 🚫 | lineExists: ✅ | canFitChar: ✅ | canFitWord: ✅
    const state = generateState(grapheme, "false_true_true_true");
    const stateStr = classifyState(state);
    expect(stateStr).toBe("false_true_true_true");
  });
  it("should return the correct state for: true_false_true_true", () => {
    // State 3: wordExists: ✅ | lineExists: 🚫 | canFitChar: ✅ | canFitWord: ✅
    const state = generateState(grapheme, "true_false_true_true");
    const stateStr = classifyState(state);
    expect(stateStr).toBe("true_false_true_true");
  });
  it("should return the correct state for: false_false_true_true", () => {
    // State 4: wordExists: 🚫 | lineExists: 🚫 | canFitChar: ✅ | canFitWord: ✅
    const state = generateState(grapheme, "false_false_true_true");
    const stateStr = classifyState(state);
    expect(stateStr).toBe("false_false_true_true");
  });
  it("should return the correct state for: true_false_false_true", () => {
    // State 5: wordExists: ✅ | lineExists: 🚫 | canFitChar: 🚫 | canFitWord: ✅
    const state = generateState(grapheme, "true_false_false_true");
    const stateStr = classifyState(state);
    expect(stateStr).toBe("true_false_false_true");
  });
  it("should return the correct state for: true_true_true_false", () => {
    // State 6: wordExists: ✅ | lineExists: ✅ | canFitChar: ✅ | canFitWord: 🚫
    const state = generateState(grapheme, "true_true_true_false");
    const stateStr = classifyState(state);
    expect(stateStr).toBe("true_true_true_false");
  });
  it("should return the correct state for: true_true_false_false", () => {
    // State 7: wordExists: ✅ | lineExists: ✅ | canFitChar: 🚫 | canFitWord: 🚫
    const state = generateState(grapheme, "true_true_false_false");
    const stateStr = classifyState(state);
    expect(stateStr).toBe("true_true_false_false");
  });
});
