import { classifyState } from "../src/classifyState";
import { generateStateFromPrimitives } from "./__mocks__/states.mock";

// Tests
describe("classifyState", () => {
  it("should return the correct state for: true_true_true_true", () => {
    // State 1: wordExists: ✅ | lineExists: ✅ | canFitChar: ✅ | canFitWord: ✅
    const state = generateStateFromPrimitives("A", "A", "A", [], Infinity);
    const stateStr = classifyState(state);
    expect(stateStr).toBe("true_true_true_true");
  });
  it("should return the correct state for: false_true_true_true", () => {
    // State 2: wordExists: 🚫 | lineExists: ✅ | canFitChar: ✅ | canFitWord: ✅
    const state = generateStateFromPrimitives("A", "", "A", [], Infinity);
    const stateStr = classifyState(state);
    expect(stateStr).toBe("false_true_true_true");
  });
  it("should return the correct state for: true_false_true_true", () => {
    // State 3: wordExists: ✅ | lineExists: 🚫 | canFitChar: ✅ | canFitWord: ✅
    const state = generateStateFromPrimitives("A", "A", "", [], Infinity);
    const stateStr = classifyState(state);
    expect(stateStr).toBe("true_false_true_true");
  });
  it("should return the correct state for: false_false_true_true", () => {
    // State 4: wordExists: 🚫 | lineExists: 🚫 | canFitChar: ✅ | canFitWord: ✅
    const state = generateStateFromPrimitives("A", "", "", [], Infinity);
    const stateStr = classifyState(state);
    expect(stateStr).toBe("false_false_true_true");
  });
  it("should return the correct state for: true_false_false_true", () => {
    // State 5: wordExists: ✅ | lineExists: 🚫 | canFitChar: 🚫 | canFitWord: ✅
    const state = generateStateFromPrimitives("A", "A", "", [], 1);
    const stateStr = classifyState(state);
    expect(stateStr).toBe("true_false_false_true");
  });
  it("should return the correct state for: true_true_true_false", () => {
    // State 6: wordExists: ✅ | lineExists: ✅ | canFitChar: ✅ | canFitWord: 🚫
    const state = generateStateFromPrimitives("A", "A", "AA", [], 2);
    const stateStr = classifyState(state);
    expect(stateStr).toBe("true_true_true_false");
  });
  it("should return the correct state for: true_true_false_false", () => {
    // State 7: wordExists: ✅ | lineExists: ✅ | canFitChar: 🚫 | canFitWord: 🚫
    const state = generateStateFromPrimitives("A", "A", "A", [], 1);
    const stateStr = classifyState(state);
    expect(stateStr).toBe("true_true_false_false");
  });
});
