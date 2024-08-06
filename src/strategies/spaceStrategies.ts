// Strategies for spaces

// Implemented using "Table-Driven-Development"
// Basically, the key for each strategy represents a configuration of the state variables

import { type GraphemeStrategy } from "./graphemeTypeMaps.js";

const ignore: GraphemeStrategy = () => {
  // Do nothing
};

const addWordThenSpace: GraphemeStrategy = ({ word, line }) => {
  line.push(word.copy());
  word.clear();
  word.appendSpacesLeft(1);
};

const clearSpacesThenAddWordThenSpace: GraphemeStrategy = ({ word, line }) => {
  word.clearSpacesLeft();
  line.push(word.copy());
  word.clear();
  word.appendSpacesLeft(1);
};

const addWordThenLine: GraphemeStrategy = ({ word, line, lines }) => {
  line.push(word.copy());
  word.clear();
  lines.push(line.copy());
  line.clear();
};

const addSpace: GraphemeStrategy = ({ word }) => {
  word.appendSpacesLeft(1);
};

const addLineThenWordThenSpace: GraphemeStrategy = ({ word, line, lines }) => {
  lines.push(line.copy());
  line.set(word.copy());
  word.clear();
  word.appendSpacesLeft(1);
};

const addLineThenWordThenLine: GraphemeStrategy = ({ word, line, lines }) => {
  lines.push(line.copy());
  line.set(word.copy());
  word.clear();
  lines.push(line.copy());
  line.clear();
};

// TABLE REFERENCE
// wordExists | lineExists | canFitChar | canFitWord
const strategies: Record<string, GraphemeStrategy> = {
  // State 1: wordExists: ✅ | lineExists: ✅ | canFitChar: ✅ | canFitWord: ✅
  true_true_true_true: addWordThenSpace,
  // State 2: wordExists: 🚫 | lineExists: ✅ | canFitChar: ✅ | canFitWord: ✅
  false_true_true_true: addSpace,
  // State 3: wordExists: ✅ | lineExists: 🚫 | canFitChar: ✅ | canFitWord: ✅
  true_false_true_true: clearSpacesThenAddWordThenSpace,
  // State 4: wordExists: 🚫 | lineExists: 🚫 | canFitChar: ✅ | canFitWord: ✅
  false_false_true_true: ignore,
  // State 5: wordExists: ✅ | lineExists: 🚫 | canFitChar: 🚫 | canFitWord: ✅
  true_false_false_true: addWordThenLine,
  // State 6: wordExists: ✅ | lineExists: ✅ | canFitChar: ✅ | canFitWord: 🚫
  true_true_true_false: addLineThenWordThenSpace,
  // State 7: wordExists: ✅ | lineExists: ✅ | canFitChar: 🚫 | canFitWord: 🚫
  true_true_false_false: addLineThenWordThenLine,
};

export default strategies;
