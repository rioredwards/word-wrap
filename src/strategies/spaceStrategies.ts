// Strategies for spaces

// Implemented using "Table-Driven-Development"
// Basically, the key for each strategy represents a configuration of the state variables

import { Grapheme } from "../Grapheme";
import { Line } from "../Line";
import { Word } from "../Word";
import { GraphemeStrategy } from "./graphemeTypeMaps";

const ignore: GraphemeStrategy = () => {
  // Do nothing
};

const addWord: GraphemeStrategy = (_: Grapheme, word: Word, line: Line) => {
  line.push(word.copy());
  word.clear();
};

const addSpaceThenWord: GraphemeStrategy = (_: Grapheme, word: Word, line: Line) => {
  word.appendSpacesRight(1);
  line.push(word.copy());
  word.clear();
};

const addSpaceToLine: GraphemeStrategy = (_: Grapheme, word: Word, line: Line) => {
  line.appendSpacesRight(1);
};

const addLineThenWord: GraphemeStrategy = (_: Grapheme, word: Word, line: Line, lines: Line[]) => {
  lines.push(line.copy());
  line.set(word.copy());
  word.clear();
};

const addLineThenSpaceThenWord: GraphemeStrategy = (
  _: Grapheme,
  word: Word,
  line: Line,
  lines: Line[]
) => {
  lines.push(line.copy());
  word.appendSpacesRight(1);
  line.set(word.copy());
  word.clear();
};

// TABLE REFERENCE
// wordExists | lineExists | canFitChar | canFitWord
const strategies: Record<string, GraphemeStrategy> = {
  // State 1: wordExists: ✅ | lineExists: ✅ | canFitChar: ✅ | canFitWord: ✅
  true_true_true_true: addSpaceThenWord,
  // State 2: wordExists: 🚫 | lineExists: ✅ | canFitChar: ✅ | canFitWord: ✅
  false_true_true_true: addSpaceToLine,
  // State 3: wordExists: ✅ | lineExists: 🚫 | canFitChar: ✅ | canFitWord: ✅
  true_false_true_true: addSpaceThenWord,
  // State 4: wordExists: 🚫 | lineExists: 🚫 | canFitChar: ✅ | canFitWord: ✅
  false_false_true_true: ignore,
  // State 5: wordExists: ✅ | lineExists: 🚫 | canFitChar: 🚫 | canFitWord: ✅
  true_false_false_true: addWord,
  // State 6: wordExists: ✅ | lineExists: ✅ | canFitChar: ✅ | canFitWord: 🚫
  true_true_true_false: addLineThenSpaceThenWord,
  // State 7: wordExists: ✅ | lineExists: ✅ | canFitChar: 🚫 | canFitWord: 🚫
  true_true_false_false: addLineThenWord,
};

export default strategies;
