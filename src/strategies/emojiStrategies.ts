// Strategies for emojis

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

const addGraphemeThenWord: GraphemeStrategy = (grapheme: Grapheme, word: Word, line: Line) => {
  word.push(grapheme);
  line.push(word.copy());
  word.clear();
};

const addWordThenGraphemeThenWord: GraphemeStrategy = (
  grapheme: Grapheme,
  word: Word,
  line: Line
) => {
  line.push(word.copy());
  word.set(grapheme);
  line.set(word.copy());
  word.clear();
};

const addLineAndGrapheme: GraphemeStrategy = (
  grapheme: Grapheme,
  word: Word,
  line: Line,
  lines: Line[]
) => {
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

const addLineThenWordThenGraphemeThenWord: GraphemeStrategy = (
  grapheme: Grapheme,
  word: Word,
  line: Line,
  lines: Line[]
) => {
  lines.push(line.copy());
  line.set(word.copy());
  word.set(grapheme);
  line.push(word.copy());
  word.clear();
};

// TABLE REFERENCE
// wordExists | lineExists | canFitChar | canFitWord
const strategies: Record<string, GraphemeStrategy> = {
  // State 1: wordExists: ✅ | lineExists: ✅ | canFitChar: ✅ | canFitWord: ✅
  true_true_true_true: addWordThenGraphemeThenWord,
  // State 2: wordExists: 🚫 | lineExists: ✅ | canFitChar: ✅ | canFitWord: ✅
  false_true_true_true: addGraphemeThenWord,
  // State 3: wordExists: ✅ | lineExists: 🚫 | canFitChar: ✅ | canFitWord: ✅
  true_false_true_true: addWordThenGraphemeThenWord,
  // State 4: wordExists: 🚫 | lineExists: 🚫 | canFitChar: ✅ | canFitWord: ✅
  false_false_true_true: addGraphemeThenWord,
  // State 5: wordExists: ✅ | lineExists: 🚫 | canFitChar: 🚫 | canFitWord: ✅
  true_false_false_true: addWordThenGraphemeThenWord,
  // State 6: wordExists: ✅ | lineExists: ✅ | canFitChar: ✅ | canFitWord: 🚫
  true_true_true_false: addLineThenWordThenGraphemeThenWord,
  // State 7: wordExists: ✅ | lineExists: ✅ | canFitChar: 🚫 | canFitWord: 🚫
  true_true_false_false: addLineThenWordThenGrapheme,
};

export default strategies;
