import GraphemeSplitter from "grapheme-splitter";

function addWordToLine(word: string[], numWhiteSpacesToInsert: number, line: string[]): void {
  const whiteSpace = " ".repeat(numWhiteSpacesToInsert);
  if (whiteSpace) line.push(whiteSpace, ...word);
  else line.push(...word);
  // Clear word
  word.length = 0;
}

function addLineToLines(line: string[], lines: string[]): void {
  lines.push(line.join(""));
  // Clear line array (passed by reference, so can't just reassign to [])
  line.length = 0;
}

function getSpaceLeftInLine(
  line: string[],
  numWhiteSpacesToInsert: number,
  maxWidth: number
): number {
  return maxWidth - line.length - numWhiteSpacesToInsert;
}

function lineHasSpaceForWord(word: string[], spaceLeftInLine: number): boolean {
  return spaceLeftInLine - word.length >= 0;
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
  let spaceLeftInLine: number = maxWidth;
  let numWhiteSpacesToInsert: number = 0;

  // Primary loop for wrapping words
  for (let i = 0; i <= graphemes.length; i++) {
    grapheme = graphemes[i];
    spaceLeftInLine = getSpaceLeftInLine(line, numWhiteSpacesToInsert, maxWidth);

    if (grapheme === " " || grapheme === "\n" || grapheme === undefined) {
      // grapheme is: space, newline, or we reached the end of the string
      if (line.length > 0) numWhiteSpacesToInsert++;
      if (word.length === 0) continue;
      if (lineHasSpaceForWord(word, spaceLeftInLine)) {
        // Need to include white space
        addWordToLine(word, numWhiteSpacesToInsert, line);
        numWhiteSpacesToInsert = 0;
      } else {
        // Line doesn't have space for word
        // Current line can be added to lines array & new line started with word
        addLineToLines(line, lines);
        numWhiteSpacesToInsert = 0;
        addWordToLine(word, numWhiteSpacesToInsert, line);
      }
      if (grapheme === "\n") addLineToLines(line, lines);
      if (grapheme === undefined) {
        // On last loop
        addLineToLines(line, lines);
        break;
      }
    } else if (grapheme === "\r") {
      // Do nothing. These are ignored completely
    } else {
      // grapheme is a regular character
      if (word.length < maxWidth) {
        word.push(grapheme);
      } else {
        // word is longer than maxWidth:
        // so split word into existing line & add rest to next line
        const splitWordEnd = word.splice(spaceLeftInLine);
        //  if (splitWordEnd.length > 1) throw new Error("🐽🐽🐽🐽 splitWordEnd.length > 1 🐽🐽🐽🐽");
        addWordToLine(word, numWhiteSpacesToInsert, line);
        numWhiteSpacesToInsert = 0;
        addLineToLines(line, lines);
        // insert the end of the splitWord to next line
        if (splitWordEnd.length > 1) addWordToLine(splitWordEnd, numWhiteSpacesToInsert, line);
        word = [grapheme];
      }
    }

    spaceLeftInLine = getSpaceLeftInLine(line, numWhiteSpacesToInsert, maxWidth);
    // TODO Test this out
    // if (spaceLeftInLine - word.length <= 0) {
    if (spaceLeftInLine <= 0) {
      addLineToLines(line, lines);
      spaceLeftInLine = maxWidth;
    }
    if (lines.length >= maxHeight) break;
  }

  // Ensure array isn't longer than maxHeight
  lines.splice(maxHeight);

  return lines;
}
