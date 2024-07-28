import { Grapheme } from "../src/Grapheme";
import { WordWrapper } from "../src/WordWrapper";
import { generateState } from "./__mocks__/states.mock";

describe("WordWrapper.wrap(), when wrapping on a space", () => {
  let grapheme = new Grapheme(" ");
  beforeEach(() => {
    grapheme = new Grapheme(" ");
  });

  describe("given a state of true_true_true_true", () => {
    it("Should addWordThenSpace", () => {
      // State 1: wordExists: ✅ | lineExists: ✅ | canFitChar: ✅ | canFitWord: ✅
      const state = generateState(grapheme, "true_true_true_true");
      const [stateStr, strategy] = WordWrapper.wrap(state);

      const { word, line, lines } = state;

      expect(stateStr).toBe("true_true_true_true");
      expect(strategy).toBe("addWordThenSpace");
      expect(word.val).toBe(" ");
      expect(line.val).toBe("AA");
      expect(lines.length).toBe(0);
    });
  });
});
