export function wrapWords(str: string, maxWidth: number, maxHeight: number): string[] | string {
  // Check if string doesn't need to be wrapped
  if (str.length <= maxWidth) return str;

  str = str.trim();
  let char: string = "";
  let word: string = "";
  let line: string = "";
  const lines: string[] = [];
  let spaceLeftInLine: number;

  // Primary loop for wrapping words
  for (let i = 0; i < str.length; i++) {
    char = str[i];

    if (char !== " ") {
      // char is not a space
      if (word.length < maxWidth) {
        // if word length isn't maxWidth
        // add it to word
        word += char;
      } else {
        // word is maxWidth and will need to be split up
        // split word into existing line
        spaceLeftInLine = maxWidth - line.length - (line.length && 1);
        const splitWordStart = word.substring(0, spaceLeftInLine);
        const splitWordEnd = word.substring(spaceLeftInLine);
        line += (line.length > 0 ? " " : "") + splitWordStart;
        lines.push(line);
        // insert the end of the splitWord to next line
        line = splitWordEnd;
        word = char;
      }
    } else {
      // char is a space
      // Check if word can be added to line (account for space between words)
      spaceLeftInLine = maxWidth - line.length - (line.length && 1);
      if (spaceLeftInLine - word.length >= 0) {
        // Line has room for word
        // Add space if line already has content, then add word
        line += (line.length > 0 ? " " : "") + word;
      } else {
        // Line doesn't have room for word
        // Current line can be added to lines array
        lines.push(line);
        // Start new line with word
        line = word;
      }
      word = "";
    }
  }

  // Account for last word
  if (word.length > 0) {
    spaceLeftInLine = maxWidth - line.length - (line.length && 1);
    if (spaceLeftInLine - word.length >= 0) {
      // Line has room for word
      // Add space if line already has content, then add word
      line += (line.length > 0 ? " " : "") + word;
    }
  }

  // Account for last line
  if (line.length > 0) {
    lines.push(line);
  }

  return lines;
}
