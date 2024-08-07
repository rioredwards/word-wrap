// The main class which does all of the word-wrapping

import GraphemeSplitter from "grapheme-splitter";
import { Grapheme } from "./Grapheme.js";
import { Word } from "./Word.js";
import { Line } from "./Line.js";
import { classifyState, type State, type StateStr } from "./classifyState.js";
import { log } from "./Logger.js";

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
    this.graphemes = WordWrapper.splitStringIntoGraphemes(sanitizedString);
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
  static splitStringIntoGraphemes(string: string): Grapheme[] {
    const splitter = new GraphemeSplitter();
    const stringsSplitByGrapheme: string[] = splitter.splitGraphemes(string);
    const graphemes = stringsSplitByGrapheme.map((str) => new Grapheme(str));
    return graphemes;
  }

  /**
   * This method performs the core wrapping logic. It processes a single grapheme and moves the state forward accordingly.
   * It is static and uses parameters instead of instance properties so it can be easily tested.
   *
   * @static
   * @param {State} state
   * @returns {[StateStr, string]}
   */
  static wrap(state: State): [StateStr, string] {
    // Get state (series of true's and false's)
    const stateStr = classifyState(state);
    // Get strategy based on grapheme & state (strategy pattern)
    const strategy = state.grapheme.strategies[stateStr];
    strategy(state);
    // Return is purely for testing (state parameter is mutated).
    return [stateStr, strategy.name];
  }

  /**
   * (Main method) This calls WordWrapper.wrap() on every grapheme and returns an array of wrapped strings.
   *
   * @returns {(string | string[])}
   */
  wrapAll(): string | string[] {
    let word: Word = new Word();
    let line: Line = new Line();
    let lines: Line[] = [];

    for (let i = 0; i < this.graphemes.length; i++) {
      const grapheme = this.graphemes[i];
      const state: State = {
        grapheme,
        word,
        line,
        lines,
        maxLength: this.maxLength,
      };
      WordWrapper.wrap(state);
    }

    return lines.map((line) => line.val);
  }

  _wrapWithLogging(): string | string[] {
    let word: Word = new Word();
    let line: Line = new Line();
    let lines: Line[] = [];

    for (let i = 0; i <= this.graphemes.length; i++) {
      const grapheme = this.graphemes[i];
      const state: State = {
        grapheme,
        word,
        line,
        lines,
        maxLength: this.maxLength,
      };
      const [stateStr, strategy] = WordWrapper.wrap(state);
      log({ ...state, stateStr, strategy });
    }

    return lines.map((line) => line.val);
  }

  async _wrapWithPromptsAndLogging(
    getInput: (question: string) => Promise<string>
  ): Promise<string | string[]> {
    let word: Word = new Word();
    let line: Line = new Line();
    let lines: Line[] = [];

    for (let i = 0; i <= this.graphemes.length; i++) {
      const grapheme = this.graphemes[i];
      const state: State = {
        grapheme,
        word,
        line,
        lines,
        maxLength: this.maxLength,
      };
      const [stateStr, strategy] = WordWrapper.wrap(state);
      log({ ...state, stateStr, strategy });
      await getInput("Continue? (press enter)");
    }

    return lines.map((line) => line.val);
  }
}
