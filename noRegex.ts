import { IOptions } from "word-wrap";

function trimEnd(str: string) {
  let lastCharPos = str.length - 1;
  while (lastCharPos >= 0 && (str[lastCharPos] === " " || str[lastCharPos] === "\t")) {
    lastCharPos--;
  }
  return str.substring(0, lastCharPos + 1);
}

function trimTabAndSpaces(str: string) {
  const lines = str.split("\n");
  const trimmedLines = lines.map((line) => trimEnd(line));
  return trimmedLines.join("\n");
}

export default function (str: string, options: IOptions) {
  options = options || {};
  if (str == null) {
    return str;
  }

  const width = options.width || 50;
  const indent = typeof options.indent === "string" ? options.indent : "  ";
  const newline = options.newline || "\n" + indent;
  const cut = options.cut || false; // Default to not cutting words

  let result = indent; // Start with the initial indentation
  let currentLine = "";

  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    // Check if we need to wrap to a new line
    if (currentLine.length >= width) {
      // If we're allowed to cut words, and it's not whitespace, break the word
      if (cut && char !== " " && char !== "\t" && char !== "\n") {
        result += currentLine + newline;
        currentLine = "";
      } else {
        // Otherwise, find the last space/tab to break on
        let lastSpaceIndex = currentLine.lastIndexOf(" ");
        if (lastSpaceIndex === -1) {
          lastSpaceIndex = currentLine.lastIndexOf("\t");
        }
        if (lastSpaceIndex === -1) {
          // No whitespace, just break the line
          result += currentLine + newline;
          currentLine = "";
        } else {
          result += currentLine.substring(0, lastSpaceIndex + 1) + newline;
          currentLine = currentLine.substring(lastSpaceIndex + 1); // Keep the rest of the word
        }
      }
    }

    // Add the current character to the line
    currentLine += char;
  }

  // Add the last line if there's anything left
  if (currentLine.length > 0) {
    result += currentLine;
  }

  if (options.trim === true) {
    result = trimTabAndSpaces(result);
  }

  return result;
}
