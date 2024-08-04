import { WordWrapper } from "../src/WordWrapper";
import { generateStateFromPrimitives } from "./__mocks__/states.mock";

describe("WordWrapper.wrap(), when wrapping on a space", () => {
  describe("given a state of true_true_true_true", () => {
    it("Should addWordThenSpace", () => {
      // State 1: wordExists: ✅ | lineExists: ✅ | canFitChar: ✅ | canFitWord: ✅
      // max:  ******
      // word:  hi
      // line: yo
      // lines:
      // intended result:
      // word:
      // line: yo hi
      // lines:
      // solution: addWordThenSpace
      const state = generateStateFromPrimitives(" ", " hi", "yo", [], 6);
      const [stateStr, strategy] = WordWrapper.wrap(state);

      const { word, line, lines } = state;

      expect(stateStr).toBe("true_true_true_true");
      expect(strategy).toBe("addWordThenSpace");
      expect(word.val).toBe(" ");
      expect(line.val).toBe("yo hi");
      expect(lines.length).toBe(0);
    });
  });
  describe("given a state of false_true_true_true", () => {
    it("Should addSpace", () => {
      // State 2: wordExists: 🚫 | lineExists: ✅ | canFitChar: ✅ | canFitWord: ✅
      // max:  ******
      // word:
      // line: hi
      // lines:
      // intended result:
      // word:
      // line: hi
      // lines:
      // solution: addSpace
      const state = generateStateFromPrimitives(" ", "", "hi", [], 6);
      const [stateStr, strategy] = WordWrapper.wrap(state);

      const { word, line, lines } = state;

      expect(stateStr).toBe("false_true_true_true");
      expect(strategy).toBe("addSpace");
      expect(word.val).toBe(" ");
      expect(line.val).toBe("hi");
      expect(lines.length).toBe(0);
    });
  });
  describe("given a state of true_false_true_true", () => {
    it("Should clearSpacesThenAddWordThenSpace", () => {
      // State 3: wordExists: ✅ | lineExists: 🚫 | canFitChar: ✅ | canFitWord: ✅
      // max:  ******
      // word: hi
      // line:
      // lines:
      // intended result:
      // word:
      // line: hi
      // lines:
      // solution: clearSpacesThenAddWordThenSpace
      const state = generateStateFromPrimitives(" ", "hi", "", [], 6);
      const [stateStr, strategy] = WordWrapper.wrap(state);

      const { word, line, lines } = state;

      expect(stateStr).toBe("true_false_true_true");
      expect(strategy).toBe("clearSpacesThenAddWordThenSpace");
      expect(word.val).toBe(" ");
      expect(line.val).toBe("hi");
      expect(lines.length).toBe(0);
    });
  });
  describe("given a state of false_false_true_true", () => {
    it("Should ignore", () => {
      // State 4: wordExists: 🚫 | lineExists: 🚫 | canFitChar: ✅ | canFitWord: ✅
      // max:  ******
      // word:
      // line:
      // lines:
      // intended result:
      // word:
      // line:
      // lines:
      // solution: ignore
      const state = generateStateFromPrimitives(" ", "", "", [], 6);
      const [stateStr, strategy] = WordWrapper.wrap(state);

      const { word, line, lines } = state;

      expect(stateStr).toBe("false_false_true_true");
      expect(strategy).toBe("ignore");
      expect(word.val).toBe("");
      expect(line.val).toBe("");
      expect(lines.length).toBe(0);
    });
  });
  describe("given a state of true_false_false_true", () => {
    it("Should addWordThenLine", () => {
      // State 5: wordExists: ✅ | lineExists: 🚫 | canFitChar: 🚫 | canFitWord: ✅
      // max:  ******
      // word: yellow
      // line:
      // lines:
      // intended result:
      // word:
      // line:
      // lines: yellow
      // solution: addWordThenLine
      const state = generateStateFromPrimitives(" ", "yellow", "", [], 6);
      const [stateStr, strategy] = WordWrapper.wrap(state);

      const { word, line, lines } = state;

      expect(stateStr).toBe("true_false_false_true");
      expect(strategy).toBe("addWordThenLine");
      expect(word.val).toBe("");
      expect(line.val).toBe("");
      expect(lines.length).toBe(1);
    });
  });
});
