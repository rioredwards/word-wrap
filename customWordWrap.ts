// export default function (str: string, width: number): string[] | string {
//   if (str.length < width) return str;

//   const newRegexString =
//     ".{1," + width + "}([\\s\u200B]+|$)|(?<=.{1," + width + "})[^\\s\u200B]+([\\s\u200B]+|$)";
//   // const regexString = ".{1," + width + "}([\\s\u200B]+|$)|[^\\s\u200B]+?([\\s\u200B]+|$)";

//   const re = new RegExp(newRegexString, "g");
//   const lines = str.match(re) || [];
//   const result = lines.map((line) => {
//     if (line.at(-1) === "\n") {
//       line = line.slice(0, line.length - 1);
//     }
//     return line;
//   });

//   return result;
// }

export default function (str: string, width: number, maxHeight: number): string[] | string {
  const words = str.split(/\s+/); // Split on any whitespace
  const lines = [];
  let currentLine = "";

  const wordsTruncated = words.flatMap((word) => {
    if (word.length > width) {
      return [word.substring(0, width), word.substring(width)];
    } else {
      return word;
    }
  });

  for (const word of wordsTruncated) {
    if (currentLine.length + word.length + 1 > width) {
      // +1 for the space between words
      lines.push(currentLine.trim());
      currentLine = ""; // Reset for the next line
    }
    currentLine += (currentLine ? " " : "") + word; // Add word with space (if not first word on the line)
    if (lines.length === maxHeight) break;
  }

  return lines; // Pad all lines to the width
}
