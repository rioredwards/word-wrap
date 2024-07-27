// This file includes all the logic for classifying the current state of the grapheme, word and lines
// The state should be represented as a string of true's and false's which indicate all the valid possible
// combinations for the following sub-states:
// This necessary for implementing Table-Driven-Development and the Strategy Pattern.

import { Grapheme } from "./Grapheme";
import { Line } from "./Line";
import { Word } from "./Word";

// wordExists | lineExists | canFitChar | canFitWord

export type State =
  | "true_true_true_true"
  | "false_true_true_true"
  | "true_false_true_true"
  | "false_false_true_true"
  | "true_false_false_true"
  | "true_true_true_false"
  | "true_true_false_false";

function wordExists(word: Word): boolean {
  return word.length > 0;
}

function lineExists(line: Line): boolean {
  return line.length > 0;
}

function canFitChar(grapheme: Grapheme, word: Word, maxLength: number): boolean {
  return grapheme.length + word.length <= maxLength;
}

function canFitWord(word: Word, line: Line, maxLength: number): boolean {
  return word.length + line.length <= maxLength;
}

export function classifyState(
  grapheme: Grapheme,
  word: Word,
  line: Line,
  maxLength: number
): State {
  let stateStr = "";
  stateStr += `${wordExists(word)}`;
  stateStr += `_${lineExists(line)}`;
  stateStr += `_${canFitChar(grapheme, word, maxLength)}`;
  stateStr += `_${canFitWord(word, line, maxLength)}`;
  return stateStr as State;
}
