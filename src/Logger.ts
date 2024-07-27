import { Word } from "./Word";
import { Line } from "./Line";
import { State } from "./classifyState";
import { GraphemeStrategy } from "./strategies/graphemeTypeMaps";
import { Grapheme } from "./Grapheme";

let graphemeCount = 0;

export function log(
  maxLength: number,
  grapheme: Grapheme,
  word: Word,
  line: Line,
  lines: Line[],
  stateStr: State,
  strategy: GraphemeStrategy
): void {
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
strategy:      ${strategy.name}
_____________________
`;

  console.log(str);
}
