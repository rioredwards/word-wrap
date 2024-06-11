import GraphemeSplitter from "grapheme-splitter";

interface HasLength {
  length: number;
}

interface HasVal<T extends string | string[]> {
  val: T;
}

interface HasValAndLength<T extends string | string[]> extends HasVal<T>, HasLength {}

function appendWordToLine(word: string[], whiteSpaceCount: number, line: string[]): void {
  if (whiteSpaceCount > 0) {
    const whiteSpace = " ".repeat(whiteSpaceCount);
    line.push(whiteSpace, ...word);
  } else line.push(...word);
  word.length = 0;
}

function appendLineToLines(line: string[], lines: string[]): void {
  lines.push(line.join(""));
  line.length = 0;
}

function canFitWordInLine(
  lineLength: number,
  whiteSpaceCount: number,
  wordLength: number,
  maxWidth: number
): boolean {
  return maxWidth - lineLength - whiteSpaceCount - wordLength >= 0;
}

interface Options {
  maxWidth: number;
  maxHeight: number;
}

export default function (string: string, options: Options): string[] | string {
  // Early return if string doesn't need to be wrapped
  if (string.length <= options.maxWidth && !string.includes("\n")) return string;

  const wordWrapper = new WordWrapper(string, options);
  const wrappedStrings: string[] | string = wordWrapper.wrap();
  return wrappedStrings;
}

/** Represents a single text character */
class Grapheme implements HasValAndLength<string> {
  strategy: GraphemeStrategy;
  val: string;
  type: GraphemeType;
  length: number;
  spacesBefore: string = "";
  spacesAfter: string = "";

  constructor(val: string) {
    this.val = val;
    this.type = classifyGrapheme(val);
    this.strategy = graphemeTypeToStrategyMap[this.type];
    this.length = graphemeLengthToStrategyMap[this.type];
  }
}

/** Contract that each grapheme strategy must implement */
type GraphemeStrategy = (grapheme: Grapheme, word: Word, line: Line, lines: Line[]) => void;

const defaultStrategy: GraphemeStrategy = (
  grapheme: Grapheme,
  word: Word,
  line: Line,
  lines: Line[]
) => {
  word.push(grapheme);
};

const spaceStrategy: GraphemeStrategy = (
  grapheme: Grapheme,
  word: Word,
  line: Line,
  lines: Line[]
) => {
  // Things to consider:
  // Default case: word & line exist, word can fit in line, line is under maxWidth
  // New Both case: word doesn't exist, line doesn't exist
  // New Word case: word doesn't exist, line exists
  // New Line case: word exists, line doesn't exists
  // End of line case: word & line exist, word can't fit in line, line is under maxWidth
  // End of word, no line case: word is maxLength, line doesn't exist
  // End of word, with line case: word is maxLength, line exists
  // End of word case: word is maxLength, line is not
  if (word.length > 0) {
    // TODO Add Series of possible states (just as comments) to help visualize different cases
    // if (canFitWordInLine(word, line)) line.push(word.copy());
    appendWordToLine(word, currWhiteSpaceCount, line);
    lineLength += wordLength + currWhiteSpaceCount;
    wordLength = 0;
    currWhiteSpaceCount = nextWhiteSpaceCount;
    nextWhiteSpaceCount = 0;
    addWordFlag = false;
  } else if (line.length > 0) currWhiteSpaceCount++;
};

const newLineStrategy: GraphemeStrategy = (
  grapheme: Grapheme,
  word: Word,
  line: Line,
  lines: Line[]
) => {
  line.push(word);
};

const emojiStrategy: GraphemeStrategy = (
  grapheme: Grapheme,
  word: Word,
  line: Line,
  lines: Line[]
) => {
  line.push(word);
};

const tabStrategy: GraphemeStrategy = (
  grapheme: Grapheme,
  word: Word,
  line: Line,
  lines: Line[]
) => {
  // Do Nothing
};

const ignoreStrategy: GraphemeStrategy = (
  grapheme: Grapheme,
  word: Word,
  line: Line,
  lines: Line[]
) => {
  // Do Nothing
};

const emptyStrategy: GraphemeStrategy = (
  grapheme: Grapheme,
  word: Word,
  line: Line,
  lines: Line[]
) => {
  // Do Nothing
};

const EMOJI_REGEX = /\p{Emoji_Presentation}/u;

type GraphemeType = "default" | "space" | "newLine" | "ignore" | "tab" | "emoji" | "empty";

const classifyGrapheme = (val: string): GraphemeType => {
  switch (true) {
    case val === undefined:
      return "empty";
    case val === " ":
      return "space";
    case val === "\n":
      return "newLine";
    case val === "\t":
      return "tab";
    case val === "\r":
      return "ignore";
    case EMOJI_REGEX.test(val!):
      return "emoji";
    default:
      return "default";
  }
};

const graphemeTypeToStrategyMap: Record<GraphemeType, GraphemeStrategy> = {
  default: defaultStrategy,
  space: spaceStrategy,
  empty: emptyStrategy,
  newLine: newLineStrategy,
  tab: tabStrategy,
  emoji: emojiStrategy,
  ignore: ignoreStrategy,
};

const graphemeLengthToStrategyMap: Record<GraphemeType, number> = {
  default: 1,
  space: 1,
  empty: 0,
  newLine: 0,
  tab: 4,
  emoji: 2,
  ignore: 0,
};

/** Represents a group of non-whitespace characters */
class Word implements HasValAndLength<string> {
  constructor(private graphemes: Grapheme[] = []) {}

  get val(): string {
    if (this.graphemes.length <= 0) return "";
    return this.graphemes.map((grapheme) => grapheme.val).join("");
  }

  get length(): number {
    if (this.graphemes.length <= 0) return 0;
    return this.graphemes.reduce((acc: number, grapheme: Grapheme) => grapheme.length + acc, 0);
  }

  push(grapheme: Grapheme): void {
    this.graphemes.push(grapheme);
  }

  copy() {
    const newGraphemes = this.graphemes.map((grapheme) => new Grapheme(grapheme.val));
    return new Word(newGraphemes);
  }
}

/** Represents a series of Words or Spaces */
class Line implements HasValAndLength<string> {
  constructor(public readonly maxWidth: number, private content: HasValAndLength<string>[] = []) {}

  get val(): string {
    if (this.content.length <= 0) return "";
    const contentVals = this.content.map((item: HasVal<string>) => item.val);
    return contentVals.join("");
  }

  get length() {
    if (this.content.length <= 0) return 0;
    return this.content.reduce((acc: number, item: HasLength) => acc + item.length, 0);
  }

  push(word: Word) {
    this.content.push(word);
  }
}

class WordWrapper {
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

    return lines;
  }

  wrapWords(string: string, maxWidth: number, maxHeight: number): string[] | string {
    // Check if string doesn't need to be wrapped
    if (string.length <= maxWidth && !string.includes("\n")) return string;

    const splitter = new GraphemeSplitter();

    const emojiRegEx = /\p{Emoji_Presentation}/u;

    // Emojis (🙂) and other special characters (é) are made up of multiple "code points" and graphemes address this. Graphemes are individual unicode characters (letters, etc...), grouped in a way that accounts for Emojis and other multi-code point characters. See:https://github.com/orling/grapheme-splitter
    // Basically, as long as chars are grouped by grapheme, we can get accurate lengths for strings and won't break emojis 👍
    const graphemes: string[] = splitter.splitGraphemes(string.trim());
    let grapheme: string = ""; // one char, but may have length > 1 (see above ^)
    let word: string[] = []; // grouped by grapheme
    let line: string[] = []; // grouped by grapheme
    // This stores the final result
    const lines: string[] = []; // graphemes are joined to strings
    // emojis should be considered length of 2 because that's how they are visually rendered in terminal
    let graphemeLength: number = 0;
    let wordLength: number = 0;
    let lineLength: number = 0;
    // Keep track of current and next white space because white space is incremented and conditionally added based on the following word.
    let currWhiteSpaceCount: number = 0;
    let nextWhiteSpaceCount: number = 0;
    // Flags to (hopefully) simplify logic
    let addGraphemeFlag: boolean = false;
    let addEmojiFlag: boolean = false;
    let addWordFlag: boolean = false;
    let addLineFlag: boolean = false;
    let addNewlineFlag: boolean = false;

    // Primary loop for wrapping words
    for (let i = 0; i <= graphemes.length; i++) {
      graphemeLength = 0;
      grapheme = graphemes[i];

      if (grapheme === " ") {
        if (wordLength > 0) {
          addWordFlag = true;
          nextWhiteSpaceCount++;
        } else if (line.length > 0) currWhiteSpaceCount++;
      } else if (grapheme === "\n") {
        addNewlineFlag = true;
        addWordFlag = true;
        addLineFlag = true;
      } else if (emojiRegEx.test(grapheme)) {
        // Treat as 2 chars wide
        // Treat as a single word (can split line without space)
        addEmojiFlag = true;
        graphemeLength = 2;
      } else if (grapheme === undefined) {
        addWordFlag = true;
        addLineFlag = true;
      } else if (grapheme === "\r") {
        // Do nothing. These are ignored completely
      } else {
        // grapheme is a regular character
        addGraphemeFlag = true;
        graphemeLength = 1;
      }

      if (addEmojiFlag) {
        if (wordLength > 0) appendWordToLine(word, currWhiteSpaceCount, line); // only if word exists
        lineLength += wordLength + currWhiteSpaceCount;
        wordLength = 0;
        currWhiteSpaceCount = nextWhiteSpaceCount;
        nextWhiteSpaceCount = 0;
        addGraphemeFlag = true;
        addWordFlag = true;
        if (!canFitWordInLine(lineLength, currWhiteSpaceCount, 2, maxWidth)) {
          if (lineLength > 0) appendLineToLines(line, lines);
          lineLength = 0;
          currWhiteSpaceCount = 0;
          nextWhiteSpaceCount = 0;
          addLineFlag = false;
        }
        addEmojiFlag = false;
      }

      if (addGraphemeFlag) {
        word.push(grapheme);
        wordLength += graphemeLength;
        addGraphemeFlag = false;
      }

      if (word.length >= maxWidth) {
        addWordFlag = true;
        addLineFlag = true;
      }

      if (addWordFlag) {
        if (wordLength > 0 || addNewlineFlag) appendWordToLine(word, currWhiteSpaceCount, line);
        lineLength += wordLength + currWhiteSpaceCount;
        wordLength = 0;
        currWhiteSpaceCount = nextWhiteSpaceCount;
        nextWhiteSpaceCount = 0;
        addWordFlag = false;
      }

      if (!canFitWordInLine(lineLength, currWhiteSpaceCount, wordLength, maxWidth)) {
        addLineFlag = true;
      }

      if (addLineFlag) {
        if (lineLength > 0 || addNewlineFlag) appendLineToLines(line, lines);
        lineLength = 0;
        currWhiteSpaceCount = 0;
        nextWhiteSpaceCount = 0;
        addLineFlag = false;
      }

      if (lines.length >= maxHeight) break;
    }

    // Ensure array isn't longer than maxHeight
    lines.splice(maxHeight);

    return lines;
  }
}
