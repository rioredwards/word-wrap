export function wrapWords(str: string, maxWidth: number, maxHeight: number): string[] | string {
  // Check if string doesn't need to be wrapped
  if (str.length <= maxWidth) return str;

  const words = str.split(/\s+/); // Split on any whitespace
  const lines: string[] = [];
  let currentLine = "";
  let spaceLeftInLine: number;

  for (let word of words) {
    // Space left in line is the allotted width minus the currentLine length
    // Minus an additional one for a space between words
    spaceLeftInLine = maxWidth - currentLine.length - (currentLine.length ? 1 : 0);

    // Single word is longer than allotted width
    if (word.length > maxWidth) {
      do {
        // Cut word and add to current line
        const wordStart = word.substring(0, spaceLeftInLine);
        // If line already has content, add a space for between words
        currentLine += (currentLine ? " " : "") + wordStart;
        lines.push(currentLine);
        currentLine = "";

        // Reassign word because it may need to be sliced again
        word = word.substring(spaceLeftInLine);
        spaceLeftInLine = maxWidth;
      } while (word !== "");
    } else {
      // Adding word is longer than allotted width
      if (spaceLeftInLine - word.length < 0) {
        lines.push(currentLine.trim());
        currentLine = ""; // Reset for the next line
      }
      currentLine += (currentLine ? " " : "") + word; // Add word with space (if not first word on the line)
      if (lines.length === maxHeight) break;
    }
  }

  // Add possible remaining currentLine
  lines.push(currentLine.substring(0, maxWidth));

  return lines; // Pad all lines to the width
}
