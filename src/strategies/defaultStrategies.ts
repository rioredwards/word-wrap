// Strategies for regular characters

import { Grapheme } from "../Grapheme";
import { Line } from "../Line";
import { Word } from "../Word";
import { GraphemeStrategy } from "./graphemeTypeMaps";

// Implemented using "Table-Driven-Development"
// Basically, the key for each strategy represents a configuration of the state variables

const addGrapheme: GraphemeStrategy = (grapheme: Grapheme, word: Word) => {
  word.push(grapheme);
};

const fitWord: GraphemeStrategy = (grapheme: Grapheme, word: Word, line: Line) => {
  line.push(word.copy().graphemes);
  word.set(grapheme);
};

const cantFitWord: GraphemeStrategy = (
  grapheme: Grapheme,
  word: Word,
  line: Line,
  lines: Line[]
) => {
  lines.push(line.copy());
  line.clear();
  word.push(grapheme);
};

const wordAndLineFull: GraphemeStrategy = (
  grapheme: Grapheme,
  word: Word,
  line: Line,
  lines: Line[]
) => {
  lines.push(line.copy());
  line.set(word.copy().graphemes);
  word.set(grapheme);
};

// TABLE REFERENCE
// wordExists | lineExists | canFitChar | canFitWord
const strategies: Record<string, GraphemeStrategy> = {
  // State 1: wordExists: ✅ | lineExists: ✅ | canFitChar: ✅ | canFitWord: ✅
  true_true_true_true: addGrapheme,
  // State 2: wordExists: 🚫 | lineExists: ✅ | canFitChar: ✅ | canFitWord: ✅
  false_true_true_true: addGrapheme,
  // State 3: wordExists: ✅ | lineExists: 🚫 | canFitChar: ✅ | canFitWord: ✅
  true_false_true_true: addGrapheme,
  // State 4: wordExists: 🚫 | lineExists: 🚫 | canFitChar: ✅ | canFitWord: ✅
  false_false_true_true: addGrapheme,
  // State 5: wordExists: ✅ | lineExists: 🚫 | canFitChar: 🚫 | canFitWord: ✅
  true_false_false_true: fitWord,
  // State 6: wordExists: ✅ | lineExists: ✅ | canFitChar: ✅ | canFitWord: 🚫
  true_true_true_false: cantFitWord,
  // State 7: wordExists: ✅ | lineExists: ✅ | canFitChar: 🚫 | canFitWord: 🚫
  true_true_false_false: wordAndLineFull,
};

export default strategies;
