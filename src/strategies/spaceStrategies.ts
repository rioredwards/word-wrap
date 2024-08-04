// Strategies for spaces

// Implemented using "Table-Driven-Development"
// Basically, the key for each strategy represents a configuration of the state variables

import { GraphemeStrategy } from "./graphemeTypeMaps";

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
  true_true_true_true: addWordThenSpace,
  false_true_true_true: addSpace,
  true_false_true_true: clearSpacesThenAddWordThenSpace,
  false_false_true_true: ignore,
  true_false_false_true: addWordThenLine,
  true_true_true_false: addLineThenWordThenSpace,
  // State 7: wordExists: ✅ | lineExists: ✅ | canFitChar: 🚫 | canFitWord: 🚫
  // max:  ******
  // word: yellow
  // line: buenos
  // lines:
  // intended result:
  // word:
  // line:
  // lines: buenos, yellow
  // solution: addLineThenWordThenLine
  true_true_false_false: addLineThenWordThenLine,
};

export default strategies;
