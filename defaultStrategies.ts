// Strategies for regular characters

import { Grapheme, GraphemeStrategy, Line, Word } from "./wordWrap2";

// ✅ VALID 1
const state1 = { wordExists: true, lineExists: true, canFitChar: true, canFitWord: true };

const defaultStrategy1: GraphemeStrategy = (
  grapheme: Grapheme,
  word: Word,
  line: Line,
  lines: Line[]
) => {
  word.push(grapheme);
};

// ✅ VALID 2
const state2 = { wordExists: false, lineExists: true, canFitChar: true, canFitWord: true };

const defaultStrategy2: GraphemeStrategy = defaultStrategy1;

// ✅ VALID 3
const state3 = { wordExists: true, lineExists: false, canFitChar: true, canFitWord: true };

const defaultStrategy3: GraphemeStrategy = defaultStrategy1;

// ✅ VALID 4 - Starting state
const state4 = { wordExists: false, lineExists: false, canFitChar: true, canFitWord: true };

const defaultStrategy4: GraphemeStrategy = defaultStrategy1;

// ✅ VALID 5
const state5 = { wordExists: true, lineExists: false, canFitChar: false, canFitWord: true };

const defaultStrategy5: GraphemeStrategy = (
  grapheme: Grapheme,
  word: Word,
  line: Line,
  lines: Line[]
) => {
  line.push(word.copy().graphemes);
  word.set(grapheme);
};

// ✅ VALID 6
const state6 = { wordExists: true, lineExists: true, canFitChar: true, canFitWord: false };

const defaultStrategy6: GraphemeStrategy = (
  grapheme: Grapheme,
  word: Word,
  line: Line,
  lines: Line[]
) => {
  lines.push(line.copy());
  line.clear();
  word.push(grapheme);
};

// ✅ VALID 7 - word and line are both full
const state7 = { wordExists: true, lineExists: true, canFitChar: false, canFitWord: false };

const defaultStrategy7: GraphemeStrategy = (
  grapheme: Grapheme,
  word: Word,
  line: Line,
  lines: Line[]
) => {
  lines.push(line.copy());
  line.set(word.copy().graphemes);
  word.set(grapheme);
};
