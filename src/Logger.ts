import type { State, StateStr } from "./classifyState.js";

let graphemeCount = 0;

interface LoggingState extends State {
  stateStr: StateStr;
  strategy: string;
}

export function log({
  maxLength,
  grapheme,
  word,
  line,
  lines,
  stateStr,
  strategy,
}: LoggingState): void {
  graphemeCount++;

  const linesStr = lines.reduce((acc, line) => `${acc}${line.val}`, "");
  const [wordExists, lineExists, canFitChar, canFitWord] = stateStr.split("_");
  const maxLengthStr = "*".repeat(maxLength);

  const str = `
\n\n\n\n
_____________________
maxLength:     ${maxLength}
graphemeCount: ${graphemeCount}
__
grapheme:      ${grapheme.val}   (${grapheme.length})  (${grapheme.type})
maxLengthStr:  ${maxLengthStr}
word:          ${word.val}       (${word.length})
line:          ${line.val}       (${line.length})
lines:         ${linesStr}
__
wordExists:    ${wordExists === "true" ? "✅" : "🚫"}
lineExists:    ${lineExists === "true" ? "✅" : "🚫"}
canFitChar:    ${canFitChar === "true" ? "✅" : "🚫"}
canFitWord:    ${canFitWord === "true" ? "✅" : "🚫"}
__
strategy:      ${strategy}
_____________________
`;

  console.log(str);
}
