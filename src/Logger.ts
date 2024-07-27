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
grapheme:      ${grapheme.val} (${grapheme.type})
word:          ${word.val}
line:          ${line.val}
lines:         ${linesStr}
maxLengthStr:  ${maxLengthStr}
__
wordExists:    ${wordExists}
lineExists:    ${lineExists}
canFitChar:    ${canFitChar}
canFitWord:    ${canFitWord}
__
strategy:      ${strategy.name}
_____________________
`;

  console.log(str);
}
