// Strategies for the newline characters

// Implemented using "Table-Driven-Development"
// Basically, the key for each strategy represents a configuration of the state variables

import { type GraphemeStrategy } from "./graphemeTypeMaps.js";

const addLine: GraphemeStrategy = ({ line, lines }) => {
  lines.push(line.copy());
  line.clear();
};

const addWordThenLine: GraphemeStrategy = ({ word, line, lines }) => {
  line.push(word.copy());
  word.clear();
  lines.push(line.copy());
  line.clear();
};

const addWordThenLineThenWordThenLine: GraphemeStrategy = (state) => {
  addWordThenLine(state);
  addWordThenLine(state);
};

const addLineThenWord: GraphemeStrategy = ({ word, line, lines }) => {
  lines.push(line.copy());
  line.set(word.copy());
  word.clear();
};

const addLineThenWordThenLine: GraphemeStrategy = ({ word, line, lines }) => {
  lines.push(line.copy());
  line.set(word.copy());
  word.clear();
  lines.push(line.copy());
  line.clear();
};

const addLineThenWordThenLineThenWord: GraphemeStrategy = (state) => {
  addLineThenWord(state);
  addLineThenWord(state);
};

// TABLE REFERENCE
// wordExists | lineExists | canFitChar | canFitWord
const strategies: Record<string, GraphemeStrategy> = {
  // State 1: wordExists: ✅ | lineExists: ✅ | canFitChar: ✅ | canFitWord: ✅
  true_true_true_true: addWordThenLine,
  // State 2: wordExists: 🚫 | lineExists: ✅ | canFitChar: ✅ | canFitWord: ✅
  false_true_true_true: addLine,
  // State 3: wordExists: ✅ | lineExists: 🚫 | canFitChar: ✅ | canFitWord: ✅
  true_false_true_true: addWordThenLine,
  // State 4: wordExists: 🚫 | lineExists: 🚫 | canFitChar: ✅ | canFitWord: ✅
  false_false_true_true: addLine,
  // State 5: wordExists: ✅ | lineExists: 🚫 | canFitChar: 🚫 | canFitWord: ✅
  true_false_false_true: addWordThenLineThenWordThenLine,
  // State 6: wordExists: ✅ | lineExists: ✅ | canFitChar: ✅ | canFitWord: 🚫
  true_true_true_false: addLineThenWordThenLine,
  // State 7: wordExists: ✅ | lineExists: ✅ | canFitChar: 🚫 | canFitWord: 🚫
  true_true_false_false: addLineThenWordThenLineThenWord,
};

export default strategies;
