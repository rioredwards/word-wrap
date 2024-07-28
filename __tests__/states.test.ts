import { classifyState } from "../src/classifyState";
import { Grapheme } from "../src/Grapheme";
import { Line } from "../src/Line";
import { Word } from "../src/Word";

// State 1: wordExists: ✅ | lineExists: ✅ | canFitChar: ✅ | canFitWord: ✅
//  true_true_true_true
// State 2: wordExists: 🚫 | lineExists: ✅ | canFitChar: ✅ | canFitWord: ✅
//  false_true_true_true
// State 3: wordExists: ✅ | lineExists: 🚫 | canFitChar: ✅ | canFitWord: ✅
//  true_false_true_true
// State 4: wordExists: 🚫 | lineExists: 🚫 | canFitChar: ✅ | canFitWord: ✅
//  false_false_true_true
// State 5: wordExists: ✅ | lineExists: 🚫 | canFitChar: 🚫 | canFitWord: ✅
//  true_false_false_true
// State 6: wordExists: ✅ | lineExists: ✅ | canFitChar: ✅ | canFitWord: 🚫
//  true_true_true_false
// State 7: wordExists: ✅ | lineExists: ✅ | canFitChar: 🚫 | canFitWord: 🚫
//  true_true_false_false

describe("classifyState", () => {
  const grapheme = new Grapheme("A");
  const lines: Line[] = [];
  const emptyWord = new Word();
  const emptyLine = new Line();
  const contentfulWord = new Word([grapheme]);
  const contentfulLine = new Line([contentfulWord]);

  it("should return the correct state for: true_true_true_true", () => {
    // State 1: wordExists: ✅ | lineExists: ✅ | canFitChar: ✅ | canFitWord: ✅
    //  true_true_true_true
    const stateStr = classifyState(grapheme, contentfulWord, contentfulLine, Infinity);
    expect(stateStr).toBe("true_true_true_true");
  });
});
