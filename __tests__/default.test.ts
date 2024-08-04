import { WordWrapper } from "../src/WordWrapper";
import { generateStateFromPrimitives } from "./__mocks__/states.mock";

describe("WordWrapper.wrap(), when wrapping on a regular character", () => {
  describe("given a state of true_true_true_true", () => {
    it("Should addGrapheme", () => {
      // State 1: wordExists: ✅ | lineExists: ✅ | canFitChar: ✅ | canFitWord: ✅
      // max:  ******
      // grapheme: Z
      // word: yo
      // line: hi
      // lines:
      // intended result:
      // word: yoZ
      // line: hi
      // lines:
      // solution: addGrapheme
      const state = generateStateFromPrimitives("Z", "yo", "hi", [], 6);
      const [stateStr, strategy] = WordWrapper.wrap(state);

      const { word, line, lines } = state;

      expect(stateStr).toBe("true_true_true_true");
      expect(strategy).toBe("addGrapheme");
      expect(word.val).toBe("yoZ");
      expect(line.val).toBe("hi");
      expect(lines.length).toBe(0);
    });
  });
});
