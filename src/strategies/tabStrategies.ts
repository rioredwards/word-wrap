// Strategies for tabs

// Implemented using "Table-Driven-Development"
// Basically, the key for each strategy represents a configuration of the state variables

import { type GraphemeStrategy } from "./graphemeTypeMaps.js";

const ignore: GraphemeStrategy = () => {
  // Do nothing
};

const addWord: GraphemeStrategy = ({ word, line }) => {
  line.push(word.copy());
  word.clear();
};

const addTabThenWord: GraphemeStrategy = ({ word, line }) => {
  // word.appendSpacesRight(4); FIXME
  line.push(word.copy());
  word.clear();
};

const addTabToLine: GraphemeStrategy = ({ word, line }) => {
  // line.appendSpacesRight(4); FIXME
};

const addLineThenWord: GraphemeStrategy = ({ word, line, lines }) => {
  lines.push(line.copy());
  line.set(word.copy());
  word.clear();
};

const addLineThenTabThenWord: GraphemeStrategy = ({ word, line, lines }) => {
  lines.push(line.copy());
  // word.appendSpacesRight(4); FIXME
  line.set(word.copy());
  word.clear();
};

// TABLE REFERENCE
// wordExists | lineExists | canFitChar | canFitWord
const strategies: Record<string, GraphemeStrategy> = {
  // State 1: wordExists: ✅ | lineExists: ✅ | canFitChar: ✅ | canFitWord: ✅
  true_true_true_true: addTabThenWord,
  // State 2: wordExists: 🚫 | lineExists: ✅ | canFitChar: ✅ | canFitWord: ✅
  false_true_true_true: addTabToLine,
  // State 3: wordExists: ✅ | lineExists: 🚫 | canFitChar: ✅ | canFitWord: ✅
  true_false_true_true: addTabThenWord,
  // State 4: wordExists: 🚫 | lineExists: 🚫 | canFitChar: ✅ | canFitWord: ✅
  false_false_true_true: ignore,
  // State 5: wordExists: ✅ | lineExists: 🚫 | canFitChar: 🚫 | canFitWord: ✅
  true_false_false_true: addWord,
  // State 6: wordExists: ✅ | lineExists: ✅ | canFitChar: ✅ | canFitWord: 🚫
  true_true_true_false: addLineThenTabThenWord,
  // State 7: wordExists: ✅ | lineExists: ✅ | canFitChar: 🚫 | canFitWord: 🚫
  true_true_false_false: addLineThenWord,
};

export default strategies;
