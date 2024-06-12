// The main class which does all of the word-wrapping

import GraphemeSplitter from "grapheme-splitter";
import { Options } from ".";
import { Grapheme } from "./Grapheme";
import { Word } from "./Word";
import { Line } from "./Line";

export class WordWrapper {
  // Inputs
  readonly maxWidth: number;
  readonly maxHeight: number;

  // Derived state
  readonly graphemes: Grapheme[];

  constructor(string: string, options: Options) {
    // Validate input
    this.validateInput(string, options);
    // Sanitize input
    const sanitizedString = this.sanitizeString(string);
    this.maxWidth = this.sanitizeNumber(options.maxWidth);
    this.maxHeight = this.sanitizeNumber(options.maxHeight);

    // Emojis (🙂) and other special characters (é) are made up of multiple "code points" and graphemes address this. Graphemes are individual unicode characters (letters, etc...), grouped in a way that accounts for Emojis and other multi-code point characters. See:https://github.com/orling/grapheme-splitter
    // Basically, as long as chars are grouped by grapheme, we can get accurate lengths for strings and won't break emojis 👍
    const graphemeStrings = this.splitByGraphemes(sanitizedString);
    this.graphemes = graphemeStrings.map((str) => new Grapheme(str));
  }

  /** Ensures input string is a string, and maxWidth and maxHeight are numbers greater than 1 */
  validateInput(string: string, options: Options): void {
    if (typeof string !== "string") throw new Error("wrapWords must be passed a valid string");
    if (isNaN(options.maxWidth) || Math.round(options.maxWidth) < 1)
      throw new Error("maxWidth must be a number greater than 1");
    if (isNaN(options.maxHeight) || Math.round(options.maxHeight) < 1)
      throw new Error("maxWidth must be a number greater than 1");
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

  wrap(): string | string[] {
    let word: Word = new Word();
    let line: Line = new Line(this.maxWidth);
    let lines: Line[] = [];

    for (const grapheme of this.graphemes) {
      grapheme.strategy(grapheme, word, line, lines);
    }

    return lines.map((line) => line.val);
  }
}
