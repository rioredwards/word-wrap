// Things to consider

type WordExists = boolean;
type LineExists = boolean;
type CanFit = boolean;

// This describes all possible states to consider when adding a new char
// Each char should consider every possibility, and address each one explicitly
interface CaseMatrix {
  wordExists: WordExists;
  lineExists: LineExists;
  canFitChar: CanFit;
  canFitWord: CanFit;
  canFitLine: CanFit;
}

// First iteration: everything is empty
const case1: CaseMatrix = {
  wordExists: false,
  lineExists: false,
  canFitChar: true,
  canFitWord: true,
  canFitLine: true,
};

// Word exists, all fit
const case2: CaseMatrix = {
  wordExists: true,
  lineExists: false,
  canFitChar: true,
  canFitWord: true,
  canFitLine: true,
};

// Word exists, can't fit char and line doesn't exist (long word with no line)
const case3: CaseMatrix = {
  wordExists: true,
  lineExists: false,
  canFitChar: false,
  canFitWord: true,
  canFitLine: true,
};

// Both exist, all fit
const caseTEMP: CaseMatrix = {
  wordExists: true,
  lineExists: true,
  canFitChar: true,
  canFitWord: true,
  canFitLine: true,
};
