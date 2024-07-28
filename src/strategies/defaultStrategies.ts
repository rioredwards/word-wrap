// Strategies for regular characters

// Implemented using "Table-Driven-Development"
// Basically, the key for each strategy represents a configuration of the state variables

import { Grapheme } from "../Grapheme";
import { Line } from "../Line";
import { Word } from "../Word";
import { GraphemeStrategy } from "./graphemeTypeMaps";

const addGrapheme: GraphemeStrategy = (grapheme: Grapheme, word: Word) => {
  word.push(grapheme);
};

const addWordThenGrapheme: GraphemeStrategy = (grapheme: Grapheme, word: Word, line: Line) => {
  line.push(word.copy());
  word.set(grapheme);
};

// Any time the line is empty, the spacesLeft on word should be reset

const clearSpacesThenAddLineAndGrapheme: GraphemeStrategy = (
  grapheme: Grapheme,
  word: Word,
  line: Line,
  lines: Line[]
) => {
  word.clearSpacesLeft();
  lines.push(line.copy());
  line.clear();
  word.push(grapheme);
};

const addLineThenWordThenGrapheme: GraphemeStrategy = (
  grapheme: Grapheme,
  word: Word,
  line: Line,
  lines: Line[]
) => {
  lines.push(line.copy());
  line.set(word.copy());
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
  true_false_false_true: addWordThenGrapheme,
  // State 6: wordExists: ✅ | lineExists: ✅ | canFitChar: ✅ | canFitWord: 🚫
  true_true_true_false: clearSpacesThenAddLineAndGrapheme,
  // State 7: wordExists: ✅ | lineExists: ✅ | canFitChar: 🚫 | canFitWord: 🚫
  true_true_false_false: addLineThenWordThenGrapheme,
};

export default strategies;
