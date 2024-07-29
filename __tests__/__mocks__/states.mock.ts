import { State } from "../../src/classifyState";
import { Grapheme } from "../../src/Grapheme";
import { Line } from "../../src/Line";
import { Word } from "../../src/Word";
import { WordWrapper } from "../../src/WordWrapper";

// Helpers
export function createWordFromString(val: string) {
  // If val has spaces at the beginning, remove them from the string and convert them into spacesLeft.
  // In the actual implementation, spaces are never included in the word string, but rather stored in the spacesLeft property.
  // This is because they may or may not be committed to the string when wrapping
  let valWithoutSpaces: string;
  let spaces: string;

  if (val.includes(" ")) {
    const lastSpaceIdx = val.lastIndexOf(" ");
    spaces = val.substring(0, lastSpaceIdx + 1);
    if (spaces.trim().length !== 0)
      throw new Error("Spaces must only be placed at beginning of word");
    valWithoutSpaces = val.trim();
  } else {
    valWithoutSpaces = val;
    spaces = "";
  }

  const graphemesForWord = WordWrapper.splitStringIntoGraphemes(valWithoutSpaces);
  const word = new Word(graphemesForWord, spaces);
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
 * @param {string} graphemeVal
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
