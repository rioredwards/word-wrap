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

const addWordThenSpace: GraphemeStrategy = (_: Grapheme, word: Word, line: Line) => {
  line.push(word.copy());
  word.clear();
  word.appendSpacesLeft(1);
};

const addWordThenLine: GraphemeStrategy = (_: Grapheme, word: Word, line: Line, lines: Line[]) => {
  line.push(word.copy());
  word.clear();
  lines.push(line.copy());
  line.clear();
};

const addSpace: GraphemeStrategy = (_: Grapheme, word: Word, __: Line) => {
  word.appendSpacesLeft(1);
};

const addLineThenWordThenSpace: GraphemeStrategy = (
  _: Grapheme,
  word: Word,
  line: Line,
  lines: Line[]
) => {
  lines.push(line.copy());
  line.set(word.copy());
  word.clear();
  word.appendSpacesLeft(1);
};

const addLineThenWordThenLine: GraphemeStrategy = (
  _: Grapheme,
  word: Word,
  line: Line,
  lines: Line[]
) => {
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
  true_false_true_true: addWordThenSpace,
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
