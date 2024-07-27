// The main class which does all of the word-wrapping

import GraphemeSplitter from "grapheme-splitter";
import { Grapheme } from "./Grapheme";
import { Word } from "./Word";
import { Line } from "./Line";
import { classifyState } from "./classifyState";
import { log } from "./Logger";

import readline from "node:readline/promises";
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export class WordWrapper {
  // Inputs
  readonly maxLength: number;
  readonly maxHeight: number;

  // Derived state
  readonly graphemes: Grapheme[];

  constructor(string: string, maxLength: number, maxHeight: number) {
    // Validate input
    this.validateInput(string, maxLength, maxHeight);
    // Sanitize input
    const sanitizedString = this.sanitizeString(string);
    this.maxLength = this.sanitizeNumber(maxLength);
    this.maxHeight = this.sanitizeNumber(maxHeight);

    // Emojis (🙂) and other special characters (é) are made up of multiple "code points" which result in inconsistent/misleading length measurements.
    // Graphemes address this. Graphemes are individual unicode characters (letters, etc...), grouped in a way that accounts for Emojis and other multi-code point characters. See:https://github.com/orling/grapheme-splitter
    // Basically, as long as chars are grouped by grapheme, we can get accurate lengths for strings and won't break emojis 👍
    const graphemeStrings = this.splitByGraphemes(sanitizedString);
    this.graphemes = graphemeStrings.map((str) => new Grapheme(str));
  }

  /** Ensures input string is a string, and maxLength and maxHeight are numbers greater than 1 */
  validateInput(string: string, maxLength: number, maxHeight: number): void {
    if (typeof string !== "string") throw new Error("wrapWords must be passed a valid string");
    if (isNaN(maxLength) || Math.round(maxLength) < 1)
      throw new Error("maxLength must be a number greater than 1");
    if (isNaN(maxHeight) || Math.round(maxHeight) < 1)
      throw new Error("maxLength must be a number greater than 1");
  }

  /** Trims whitespace, removes \r, and replaces \t with 4 spaces */
  sanitizeString(string: string): string {
    string = string.trim();
    string = string.replace(/\r/g, ""); // Remove carriage returns
    string = string.replace(/\t/g, "    "); // Replace tabs with spaces
    return string;
  }

  /** Rounds numbers to nearest int */
  sanitizeNumber(num: number): number {
    return Math.round(num);
  }

  /** Splits a string into an array of Graphemes. A Grapheme is one or multiple unicode code points, grouped by their actual, visual representation. This is important because some characters are made up of multiple code points (e.g. Emojis "🙂" and other special characters "é"). Properly grouping the code points for these is essential for treating them as a single unit. */
  splitByGraphemes(string: string): string[] {
    const splitter = new GraphemeSplitter();
    const graphemes: string[] = splitter.splitGraphemes(string);
    return graphemes;
  }

  async wrap(): Promise<string | string[]> {
    let word: Word = new Word();
    let line: Line = new Line([], this.maxLength);
    let lines: Line[] = [];

    for (const grapheme of this.graphemes) {
      // Get state (series of true's and false's)
      const stateStr = classifyState(grapheme, word, line, this.maxLength);
      const strategy = grapheme.strategies[stateStr];
      log(this.maxLength, grapheme, word, line, lines, stateStr, strategy);
      strategy(grapheme, word, line, lines);
      await getInput("Continue? (press enter)");
    }

    return lines.map((line) => line.val);
  }
}

async function getInput(question: string) {
  const res = await rl.question(question);
  return res;
}
