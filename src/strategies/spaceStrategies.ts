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
  // State 1: wordExists: ✅ | lineExists: ✅ | canFitChar: ✅ | canFitWord: ✅
  // max:  ******
  // word:  hi
  // line: yo
  // lines:
  // intended result:
  // word:
  // line: yo hi
  // lines:
  // solution: addWordThenSpace
  true_true_true_true: addWordThenSpace,
  // State 2: wordExists: 🚫 | lineExists: ✅ | canFitChar: ✅ | canFitWord: ✅
  // max:  ******
  // word:
  // line: hi
  // lines:
  // intended result:
  // word:
  // line: hi
  // lines:
  // solution: addSpace
  false_true_true_true: addSpace,
  // State 3: wordExists: ✅ | lineExists: 🚫 | canFitChar: ✅ | canFitWord: ✅
  // max:  ******
  // word: hi
  // line:
  // lines:
  // intended result:
  // word:
  // line: hi
  // lines:
  // solution: addWordThenSpace
  true_false_true_true: clearSpacesThenAddWordThenSpace,
  // State 4: wordExists: 🚫 | lineExists: 🚫 | canFitChar: ✅ | canFitWord: ✅
  // max:  ******
  // word:
  // line:
  // lines:
  // intended result:
  // word:
  // line:
  // lines:
  // solution: ignore
  false_false_true_true: ignore,
  // State 5: wordExists: ✅ | lineExists: 🚫 | canFitChar: 🚫 | canFitWord: ✅
  // max:  ******
  // word: yellow
  // line:
  // lines:
  // intended result:
  // word:
  // line:
  // lines: yellow
  // solution: addWordThenLine
  true_false_false_true: addWordThenLine,
  // State 6: wordExists: ✅ | lineExists: ✅ | canFitChar: ✅ | canFitWord: 🚫
  // max:  ******
  // word: hi
  // line: hello
  // lines:
  // intended result:
  // word:
  // line: hi
  // lines: hello
  // solution: addLineThenWordThenSpace
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
