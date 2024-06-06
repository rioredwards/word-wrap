export function wrapWords(str: string, maxWidth: number, maxHeight: number): string[] | string {
  // Check if string doesn't need to be wrapped
  if (str.length <= maxWidth) return str;

  let char: string = "";
  let word: string = "";
  let line: string = "";
  const lines: string[] = [];
  let spaceLeftInLine: number;

  for (let i = 0; i < str.length; i++) {
    char = str[i];

    if (char !== " ") {
      // currChar is not a space, so add it to word
      word += char;
    } else {
      // currChar is a space
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

  return lines;
}

// Start by just building words
