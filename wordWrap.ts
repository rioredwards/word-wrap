import GraphemeSplitter from "grapheme-splitter";

function addWordToLine(word: string[], line: string[]): void {
  if (line.length > 0) line.push(" ", ...word);
  else line.push(...word);
}

function addLineToLines(line: string[], lines: string[]): void {
  lines.push(line.join(""));
}

function getSpaceLeftInLine(line: string[], maxWidth: number): number {
  return maxWidth - line.length - (line.length && line.length !== maxWidth ? 1 : 0);
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
  let spaceLeftInLine: number;

  // Primary loop for wrapping words
  for (let i = 0; i <= graphemes.length; i++) {
    grapheme = graphemes[i];
    spaceLeftInLine = getSpaceLeftInLine(line, maxWidth);

    if (grapheme === " " || grapheme === undefined) {
      // grapheme is a space or we reached the end of the string
      if (lineHasSpaceForWord(word, spaceLeftInLine)) {
        addWordToLine(word, line);
      } else {
        // Line doesn't have space for word
        // Current line can be added to lines array & new line started with word
        addLineToLines(line, lines);
        line = [...word];
      }
      if (grapheme === undefined) {
        // On last loop
        addLineToLines(line, lines);
        break;
      }
      word = [];
    } else if (grapheme === "\n") {
      if (lineHasSpaceForWord(word, spaceLeftInLine)) {
        addWordToLine(word, line);
      } else {
        // Line doesn't have space for word
        addLineToLines(line, lines);
        line = [...word];
      }
      // split the line & ignore the newline
      addLineToLines(line, lines);
      word = [];
      line = [];
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
        addWordToLine(word, line);
        addLineToLines(line, lines);
        // insert the end of the splitWord to next line
        line = [...splitWordEnd];
        word = [grapheme];
      }
    }

    spaceLeftInLine = getSpaceLeftInLine(line, maxWidth);
    if (spaceLeftInLine <= 0) {
      addLineToLines(line, lines);
      line = [];
      word = [];
      spaceLeftInLine = maxWidth;
    }
    if (lines.length >= maxHeight) break;
  }

  // Ensure array isn't longer than maxHeight
  lines.splice(maxHeight);

  return lines;
}
