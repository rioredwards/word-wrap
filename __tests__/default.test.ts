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
  describe("given a state of false_true_true_true", () => {
    it("Should addGrapheme", () => {
      // State 2: wordExists: 🚫 | lineExists: ✅ | canFitChar: ✅ | canFitWord: ✅
      // max:  ******
      // grapheme: Z
      // word:
      // line: hi
      // lines:
      // intended result:
      // word: yoZ
      // line: hi
      // lines:
      // solution: addGrapheme
      const state = generateStateFromPrimitives("Z", "", "hi", [], 6);
      const [stateStr, strategy] = WordWrapper.wrap(state);

      const { word, line, lines } = state;

      expect(stateStr).toBe("false_true_true_true");
      expect(strategy).toBe("addGrapheme");
      expect(word.val).toBe("Z");
      expect(line.val).toBe("hi");
      expect(lines.length).toBe(0);
    });
  });
  describe("given a state of true_false_true_true", () => {
    it("Should addGrapheme", () => {
      // State 3: wordExists: ✅ | lineExists: 🚫 | canFitChar: ✅ | canFitWord: ✅
      // max:  ******
      // grapheme: Z
      // word: yo
      // line:
      // lines:
      // intended result:
      // word: yoZ
      // line: hi
      // lines:
      // solution: addGrapheme
      const state = generateStateFromPrimitives("Z", "yo", "", [], 6);
      const [stateStr, strategy] = WordWrapper.wrap(state);

      const { word, line, lines } = state;

      expect(stateStr).toBe("true_false_true_true");
      expect(strategy).toBe("addGrapheme");
      expect(word.val).toBe("yoZ");
      expect(line.val).toBe("");
      expect(lines.length).toBe(0);
    });
  });
  describe("given a state of false_false_true_true", () => {
    it("Should addGrapheme", () => {
      // State 4: wordExists: 🚫 | lineExists: 🚫 | canFitChar: ✅ | canFitWord: ✅
      // max:  ******
      // grapheme: Z
      // word:
      // line:
      // lines:
      // intended result:
      // word: yoZ
      // line: hi
      // lines:
      // solution: addGrapheme
      const state = generateStateFromPrimitives("Z", "", "", [], 6);
      const [stateStr, strategy] = WordWrapper.wrap(state);

      const { word, line, lines } = state;

      expect(stateStr).toBe("false_false_true_true");
      expect(strategy).toBe("addGrapheme");
      expect(word.val).toBe("Z");
      expect(line.val).toBe("");
      expect(lines.length).toBe(0);
    });
  });
  describe("given a state of true_false_false_true", () => {
    it("Should addWordThenGrapheme", () => {
      // State 5: wordExists: ✅ | lineExists: 🚫 | canFitChar: 🚫 | canFitWord: ✅
      // max:  ******
      // grapheme: Z
      // word: yellow
      // line:
      // lines:
      // intended result:
      // word: yoZ
      // line: hi
      // lines:
      // solution: addGrapheme
      const state = generateStateFromPrimitives("Z", "yellow", "", [], 6);
      const [stateStr, strategy] = WordWrapper.wrap(state);

      const { word, line, lines } = state;

      expect(stateStr).toBe("true_false_false_true");
      expect(strategy).toBe("addWordThenGrapheme");
      expect(word.val).toBe("Z");
      expect(line.val).toBe("yellow");
      expect(lines.length).toBe(0);
    });
  });
  describe("given a state of true_true_false_false", () => {
    it("Should clearSpacesThenAddLineAndGrapheme", () => {
      // State 6: wordExists: ✅ | lineExists: ✅ | canFitChar: ✅ | canFitWord: 🚫
      // max:  ******
      // grapheme: Z
      // word:  hi
      // line: hello
      // lines:
      // intended result:
      // word: hiZ
      // line:
      // lines: hello
      // solution: addGrapheme
      const state = generateStateFromPrimitives("Z", " hi", "hello", [], 6);
      const [stateStr, strategy] = WordWrapper.wrap(state);

      const { word, line, lines } = state;

      expect(stateStr).toBe("true_true_true_false");
      expect(strategy).toBe("clearSpacesThenAddLineAndGrapheme");
      expect(word.val).toBe("hiZ");
      expect(line.val).toBe("");
      expect(lines.length).toBe(1);
      expect(lines[0].val).toBe("hello");
    });
  });
  describe("given a state of true_true_false_false", () => {
    it("Should addLineThenWordThenGrapheme", () => {
      // State 7: wordExists: ✅ | lineExists: ✅ | canFitChar: 🚫 | canFitWord: 🚫
      // max:  ******
      // grapheme: Z
      // word: yellow
      // line: yo
      // lines:
      // intended result:
      // word: Z
      // line: yellow
      // lines: yo
      // solution: addLineThenWordThenGrapheme

      // TODO: deal with words that are too long merely because of spacesLeft: if word can't fit and word has spacesLeft, then add line, clear spacesLeft and add grapheme to word
      const state = generateStateFromPrimitives("Z", "yellow", "yo", [], 6);
      const [stateStr, strategy] = WordWrapper.wrap(state);

      const { word, line, lines } = state;

      expect(stateStr).toBe("true_true_false_false");
      expect(strategy).toBe("addLineThenWordThenGrapheme");
      expect(word.val).toBe("Z");
      expect(line.val).toBe("yellow");
      expect(lines.length).toBe(1);
      expect(lines[0].val).toBe("yo");
    });
  });
});
