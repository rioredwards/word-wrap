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
  line: string[],
  whiteSpaceCount: number,
  word: string[],
  maxWidth: number
): boolean {
  return maxWidth - line.length - whiteSpaceCount - word.length >= 0;
}

export function wrapWords(string: string, maxWidth: number, maxHeight: number): string[] | string {
  // Check if string doesn't need to be wrapped
  if (string.length <= maxWidth && !string.includes("\n")) return string;

  const splitter = new GraphemeSplitter();

  // Emojis (🙂) and other special characters (é) are made up of multiple "code points" and graphemes address this. Graphemes are individual unicode characters (letters, etc...), grouped in a way that accounts for Emojis and other multi-code point characters. See:https://github.com/orling/grapheme-splitter
  // Basically, as long as chars are grouped by grapheme, we can get accurate lengths for strings and won't break emojis 👍
  const graphemes: string[] = splitter.splitGraphemes(string.trim());
  let grapheme: string = ""; // one char, but may have length > 1 (see above ^)
  let word: string[] = []; // grouped by grapheme
  let line: string[] = []; // grouped by grapheme
  const lines: string[] = []; // graphemes are joined to strings
  let currWhiteSpaceCount: number = 0;
  let nextWhiteSpaceCount: number = 0;
  let addGraphemeFlag: boolean = false;
  let addWordFlag: boolean = false;
  let addLineFlag: boolean = false;

  // Primary loop for wrapping words
  for (let i = 0; i <= graphemes.length; i++) {
    grapheme = graphemes[i];

    if (grapheme === " ") {
      if (word.length > 0) nextWhiteSpaceCount++;
      if (word.length > 0) addWordFlag = true;
    } else if (grapheme === "\n" || grapheme === undefined) {
      if (word.length > 1) {
        addWordFlag = true;
        addLineFlag = true;
      }
    } else if (grapheme === "\r") {
      // Do nothing. These are ignored completely
    } else {
      // grapheme is a regular character
      addGraphemeFlag = true;
    }

    if (addGraphemeFlag) {
      word.push(grapheme);
      addGraphemeFlag = false;
    }

    if (word.length >= maxWidth) {
      addWordFlag = true;
      addLineFlag = true;
    }

    if (addWordFlag) {
      addWordToLine(word, currWhiteSpaceCount, line);
      currWhiteSpaceCount = nextWhiteSpaceCount;
      nextWhiteSpaceCount = 0;
      addWordFlag = false;
    }

    if (!isSpaceForWordInLine(line, currWhiteSpaceCount, word, maxWidth)) {
      addLineFlag = true;
    }

    if (addLineFlag) {
      addLineToLines(line, lines);
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

// if (lineHasSpaceForWord(word, numWhiteSpacesToInsert, spaceLeftInLine)) {
//   addWordToLine(word, numWhiteSpacesToInsert, line);
//   numWhiteSpacesToInsert = 0;
// } else {
//   // Line doesn't have space for word
//   // Current line can be added to lines array & new line started with word
//   addLineToLines(line, lines);
//   numWhiteSpacesToInsert = 0;
//   addWordToLine(word, numWhiteSpacesToInsert, line);
// }

// if (word.length >= maxWidth) {
//   addWordFlag = true;
// }

// if (word.length >= maxWidth) {
//   // word is maxWidth:
//   // so just create full line out of it
//   addWordToLine(word, numWhiteSpacesToInsertBeforeNextWord, line);
//   numWhiteSpacesToInsertBeforeNextWord = 0;
//   addLineToLines(line, lines);
//   // insert the end of the splitWord to next line
//   if (splitWordEnd.length > 1)
//     addWordToLine(splitWordEnd, numWhiteSpacesToInsertBeforeNextWord, line);
//   word = [grapheme];
// }
