export function wrapWords(str: string, width: number, maxHeight: number): string[] | string {
  const words = str.split(/\s+/); // Split on any whitespace
  const lines: string[] = [];
  let currentLine = "";
  let spaceLeftInLine: number;

  for (let word of words) {
    // Space left in line is the allotted width minus the currentLine length
    // Minus an additional one for a space between words
    spaceLeftInLine = width - currentLine.length - (currentLine.length ? 1 : 0);

    // Single word is longer than allotted width
    if (word.length > width) {
      do {
        // Cut word and add to current line
        const wordStart = word.substring(0, spaceLeftInLine);
        // If line already has content, add a space for between words
        currentLine += (currentLine ? " " : "") + wordStart;
        lines.push(currentLine);
        currentLine = "";

        // Reassign word because it may need to be sliced again
        word = word.substring(spaceLeftInLine);
        spaceLeftInLine = width;
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
  lines.push(currentLine.substring(0, width));

  return lines; // Pad all lines to the width
}
