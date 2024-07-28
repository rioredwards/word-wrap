import { Grapheme } from "../src/Grapheme";
import { Line } from "../src/Line";
import { log } from "../src/Logger";
import { Word } from "../src/Word";
import { WordWrapper } from "../src/WordWrapper";
const { wrap } = WordWrapper;

describe("WordWrapper.wrap(), when wrapping on a space", () => {
  let grapheme = new Grapheme(" ");
  beforeEach(() => {
    grapheme = new Grapheme(" ");
  });

  describe("given empty initial state", () => {
    it("Should do nothing", () => {
      const word = new Word();
      const line = new Line();
      const lines: Line[] = [];
      const maxLength = Infinity;

      const [stateStr, strategy] = wrap(grapheme, word, line, lines, maxLength);

      // log(maxLength, grapheme, word, line, lines, stateStr, strategy);

      // wordExists | lineExists | canFitChar | canFitWord
      expect(stateStr).toBe("false_false_true_true");
      expect(strategy).toBe("ignore");
    });
  });
});
