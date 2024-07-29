import { State, StateStr } from "../../src/classifyState";
import { Grapheme } from "../../src/Grapheme";
import { Line } from "../../src/Line";
import { Word } from "../../src/Word";
import { WordWrapper } from "../../src/WordWrapper";

// Helpers
export function createWordFromString(val: string) {
  const graphemesForWord = WordWrapper.splitStringIntoGraphemes(val);
  const word = new Word(graphemesForWord);
  return word;
}

export function createLineFromString(val: string) {
  const word = createWordFromString(val);
  const line = new Line([word]);
  return line;
}

export function createLinesFromStrings(vals: string[]) {
  const lines = vals.map((val) => createLineFromString(val));
  return lines;
}

/**
 * Helper function for creating an entire state configuration to use in testing.
 * Input a series of primitives which will be turned into objects of their respective types.
 *
 * @export
 * @param {string} graphemeInput
 * @param {string} wordInput
 * @param {string} lineInput
 * @param {string[]} linesInput
 * @param {number} maxLength
 * @returns {State}
 */
export function generateStateFromPrimitives(
  graphemeVal: string,
  wordInput: string,
  lineInput: string,
  linesInput: string[],
  maxLength: number
): State {
  const state = {
    grapheme: new Grapheme(graphemeVal),
    word: createWordFromString(wordInput),
    line: createLineFromString(lineInput),
    lines: createLinesFromStrings(linesInput),
    maxLength: maxLength,
  };
  return state;
}

// /**
//  * Helper function for creating an entire state configuration to use in testing.
//  * Input a stateStr to get a state config which matches.
//  *
//  * @param {StateStr} stateStr
//  * @returns {(State | void)}
//  */
// export function generateStateFromString(stateStr: StateStr): State {
//   const grapheme = new Grapheme("A");

//   switch (stateStr) {
//     // State 1: wordExists: ✅ | lineExists: ✅ | canFitChar: ✅ | canFitWord: ✅
//     case "true_true_true_true":
//       return {
//         grapheme,
//         word: newWordOfLength(1),
//         line: newLineOfLength(1),
//         maxLength: Infinity,
//         lines: [],
//       };
//     // State 2: wordExists: 🚫 | lineExists: ✅ | canFitChar: ✅ | canFitWord: ✅
//     case "false_true_true_true":
//       return {
//         grapheme,
//         word: newWordOfLength(0),
//         line: newLineOfLength(1),
//         maxLength: Infinity,
//         lines: [],
//       };
//     // State 3: wordExists: ✅ | lineExists: 🚫 | canFitChar: ✅ | canFitWord: ✅
//     case "true_false_true_true":
//       return {
//         grapheme,
//         word: newWordOfLength(1),
//         line: newLineOfLength(0),
//         maxLength: Infinity,
//         lines: [],
//       };
//     // State 4: wordExists: 🚫 | lineExists: 🚫 | canFitChar: ✅ | canFitWord: ✅
//     case "false_false_true_true":
//       return {
//         grapheme,
//         word: newWordOfLength(0),
//         line: newLineOfLength(0),
//         maxLength: Infinity,
//         lines: [],
//       };
//     // State 5: wordExists: ✅ | lineExists: 🚫 | canFitChar: 🚫 | canFitWord: ✅
//     case "true_false_false_true":
//       return {
//         grapheme,
//         word: newWordOfLength(1),
//         line: newLineOfLength(0),
//         maxLength: 1,
//         lines: [],
//       };
//     // State 6: wordExists: ✅ | lineExists: ✅ | canFitChar: ✅ | canFitWord: 🚫
//     case "true_true_true_false":
//       return {
//         grapheme,
//         word: newWordOfLength(1),
//         line: newLineOfLength(2),
//         maxLength: 2,
//         lines: [],
//       };
//     // State 7: wordExists: ✅ | lineExists: ✅ | canFitChar: 🚫 | canFitWord: 🚫
//     case "true_true_false_false":
//       return {
//         grapheme,
//         word: newWordOfLength(2),
//         line: newLineOfLength(2),
//         maxLength: 2,
//         lines: [],
//       };
//     default:
//       throw new Error("Invalid inputs for generateState");
//   }
// }
