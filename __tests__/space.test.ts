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
});
