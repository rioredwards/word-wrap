import { State, StateStr } from "../../src/classifyState";
import { Grapheme } from "../../src/Grapheme";
import { Line } from "../../src/Line";
import { Word } from "../../src/Word";

// Helpers
export function newWordOfLength(length: number) {
  const grapheme = new Grapheme("A");
  const graphemes = Array.from({ length }, () => grapheme);
  return new Word(graphemes);
}

export function newLineOfLength(length: number) {
  const word = newWordOfLength(length);
  return new Line([word]);
}

/**
 * Helper function for creating an entire state configuration to use in testing
 *
 * @param {Grapheme} grapheme
 * @param {StateStr} stateStr
 * @returns {(State | void)}
 */
export function generateState(grapheme: Grapheme, stateStr: StateStr): State {
  switch (stateStr) {
    // State 1: wordExists: ✅ | lineExists: ✅ | canFitChar: ✅ | canFitWord: ✅
    case "true_true_true_true":
      return {
        grapheme,
        word: newWordOfLength(1),
        line: newLineOfLength(1),
        maxLength: Infinity,
        lines: [],
      };
    // State 2: wordExists: 🚫 | lineExists: ✅ | canFitChar: ✅ | canFitWord: ✅
    case "false_true_true_true":
      return {
        grapheme,
        word: newWordOfLength(0),
        line: newLineOfLength(1),
        maxLength: Infinity,
        lines: [],
      };
    // State 3: wordExists: ✅ | lineExists: 🚫 | canFitChar: ✅ | canFitWord: ✅
    case "true_false_true_true":
      return {
        grapheme,
        word: newWordOfLength(1),
        line: newLineOfLength(0),
        maxLength: Infinity,
        lines: [],
      };
    // State 4: wordExists: 🚫 | lineExists: 🚫 | canFitChar: ✅ | canFitWord: ✅
    case "false_false_true_true":
      return {
        grapheme,
        word: newWordOfLength(0),
        line: newLineOfLength(0),
        maxLength: Infinity,
        lines: [],
      };
    // State 5: wordExists: ✅ | lineExists: 🚫 | canFitChar: 🚫 | canFitWord: ✅
    case "true_false_false_true":
      return {
        grapheme,
        word: newWordOfLength(1),
        line: newLineOfLength(0),
        maxLength: 1,
        lines: [],
      };
    // State 6: wordExists: ✅ | lineExists: ✅ | canFitChar: ✅ | canFitWord: 🚫
    case "true_true_true_false":
      return {
        grapheme,
        word: newWordOfLength(1),
        line: newLineOfLength(2),
        maxLength: 2,
        lines: [],
      };
    // State 7: wordExists: ✅ | lineExists: ✅ | canFitChar: 🚫 | canFitWord: 🚫
    case "true_true_false_false":
      return {
        grapheme,
        word: newWordOfLength(2),
        line: newLineOfLength(2),
        maxLength: 2,
        lines: [],
      };
    default:
      throw new Error("Invalid inputs for generateState");
  }
}
