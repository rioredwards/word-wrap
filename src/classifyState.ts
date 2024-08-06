// This file includes all the logic for classifying the current state of the grapheme, word and lines
// The state should be represented as a string of true's and false's which indicate all the valid possible
// combinations for the following sub-states:
// wordExists | lineExists | canFitChar | canFitWord
// This necessary for implementing Table-Driven-Development and the Strategy Pattern.

import { Grapheme } from "./Grapheme.js";
import { Line } from "./Line.js";
import { Word } from "./Word.js";

export interface State {
  grapheme: Grapheme;
  word: Word;
  line: Line;
  lines: Line[];
  maxLength: number;
}

// wordExists | lineExists | canFitChar | canFitWord
export type StateStr =
  | "true_true_true_true"
  | "false_true_true_true"
  | "true_false_true_true"
  | "false_false_true_true"
  | "true_false_false_true"
  | "true_true_true_false"
  | "true_true_false_false";

function wordExists({ word }: State): boolean {
  return word.hasContent();
}

function lineExists({ line }: State): boolean {
  return line.length > 0;
}

function canFitChar({ grapheme, word, maxLength }: State): boolean {
  return grapheme.length + word.length <= maxLength;
}

function canFitWord({ word, line, maxLength }: State): boolean {
  return word.length + line.length <= maxLength;
}

export function classifyState(state: State): StateStr {
  let stateStr = "";
  stateStr += `${wordExists(state)}`;
  stateStr += `_${lineExists(state)}`;
  stateStr += `_${canFitChar(state)}`;
  stateStr += `_${canFitWord(state)}`;
  return stateStr as StateStr;
}
