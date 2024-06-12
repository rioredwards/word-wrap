import GraphemeSplitter from "grapheme-splitter";

function addWordToLine(word: string[], whiteSpaceCount: number, line: string[]): void {
  if (whiteSpaceCount > 0) {
    const whiteSpace = " ".repeat(whiteSpaceCount);
    line.push(whiteSpace, ...word);
  } else line.push(...word);
  word.length = 0;
}

function addLineToLines(line: string[], lines: string[]): void {
  lines.push(line.join(""));
  line.length = 0;
}

function isSpaceForWordInLine(
  lineLength: number,
  whiteSpaceCount: number,
  wordLength: number,
  maxWidth: number
): boolean {
  return maxWidth - lineLength - whiteSpaceCount - wordLength >= 0;
}

export function wrapWords(string: string, maxWidth: number, maxHeight: number): string[] | string {
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
      if (wordLength > 0) addWordToLine(word, currWhiteSpaceCount, line); // only if word exists
      lineLength += wordLength + currWhiteSpaceCount;
      wordLength = 0;
      currWhiteSpaceCount = nextWhiteSpaceCount;
      nextWhiteSpaceCount = 0;
      addGraphemeFlag = true;
      addWordFlag = true;
      if (!isSpaceForWordInLine(lineLength, currWhiteSpaceCount, 2, maxWidth)) {
        if (lineLength > 0) addLineToLines(line, lines);
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
      if (wordLength > 0 || addNewlineFlag) addWordToLine(word, currWhiteSpaceCount, line);
      lineLength += wordLength + currWhiteSpaceCount;
      wordLength = 0;
      currWhiteSpaceCount = nextWhiteSpaceCount;
      nextWhiteSpaceCount = 0;
      addWordFlag = false;
    }

    if (!isSpaceForWordInLine(lineLength, currWhiteSpaceCount, wordLength, maxWidth)) {
      addLineFlag = true;
    }

    if (addLineFlag) {
      if (lineLength > 0 || addNewlineFlag) addLineToLines(line, lines);
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
