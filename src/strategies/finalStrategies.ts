// Strategies for the final character

// Implemented using "Table-Driven-Development"
// Basically, the key for each strategy represents a configuration of the state variables

import { FinalState, FinalStateStr } from "../classifyState.js";

type FinalStrategy = (state: FinalState) => void;

const ignore: FinalStrategy = () => {
  // Do nothing
};

const addLine: FinalStrategy = ({ line, lines }) => {
  lines.push(line.copy());
  line.clear();
};

const addWordThenLine: FinalStrategy = ({ word, line, lines }) => {
  line.push(word.copy());
  word.clear();
  lines.push(line.copy());
  line.clear();
};

// TABLE REFERENCE
// wordExists | lineExists | canFitWord
const strategies: Record<FinalStateStr, FinalStrategy> = {
  // State 1: wordExists: ✅ | lineExists: ✅ | canFitWord: ✅
  true_true_true: addWordThenLine,
  // State 2: wordExists: 🚫 | lineExists: ✅ | canFitWord: ✅
  false_true_true: addLine,
  // State 3: wordExists: ✅ | lineExists: 🚫 | canFitWord: ✅
  true_false_true: addWordThenLine,
  // State 4: wordExists: ✅ | lineExists: ✅ | canFitWord: 🚫
  true_true_false: addLine,
  // State 5: wordExists: 🚫 | lineExists: 🚫 | canFitWord: ✅
  false_false_true: ignore,
};

export default strategies;
