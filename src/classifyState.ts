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

export type FinalState = Omit<State, "grapheme">;

// wordExists | lineExists | canFitChar | canFitWord
export type StateStr =
  | "true_true_true_true"
  | "false_true_true_true"
  | "true_false_true_true"
  | "false_false_true_true"
  | "true_false_false_true"
  | "true_true_true_false"
  | "true_true_false_false";

// wordExists | lineExists | canFitWord
export type FinalStateStr =
  | "true_true_true"
  | "false_true_true"
  | "true_false_true"
  | "true_true_false"
  | "false_false_true";

function wordExists(word: Word): boolean {
  return word.hasContent();
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

export function classifyFinalState({ word, line, maxLength }: FinalState): FinalStateStr {
  let stateStr = "";
  stateStr += `${wordExists(word)}`;
  stateStr += `_${lineExists(line)}`;
  stateStr += `_${canFitWord(word, line, maxLength)}`;
  return stateStr as FinalStateStr;
}

export function classifyState({ grapheme, word, line, maxLength }: State): StateStr {
  let stateStr = "";
  stateStr += `${wordExists(word)}`;
  stateStr += `_${lineExists(line)}`;
  stateStr += `_${canFitChar(grapheme, word, maxLength)}`;
  stateStr += `_${canFitWord(word, line, maxLength)}`;
  return stateStr as StateStr;
}
