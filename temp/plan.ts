// Things to consider

// This describes all possible states to consider when adding a new char
// Each char should consider every possibility, and address each one explicitly
interface CaseMatrix {
  wordExists: boolean;
  lineExists: boolean;
  canFitChar: boolean;
  canFitWord: boolean;
}

/* 🚫 INVALID */
const case1: CaseMatrix = {
  wordExists: false,
  lineExists: false,
  canFitChar: false,
  canFitWord: false,
};

const states = [true, false];

const allStates: CaseMatrix[] = [];

for (const state1 of states) {
  for (const state2 of states) {
    for (const state3 of states) {
      for (const state4 of states) {
        const state: CaseMatrix = {
          wordExists: state4,
          lineExists: state3,
          canFitChar: state2,
          canFitWord: state1,
        };
        allStates.push(state);
      }
    }
  }
}

console.log(allStates);
const stringified = allStates.map(
  (state, idx) => `const state${idx + 1} = ${JSON.stringify(state)}`
);

const string = stringified.join("\n");
console.log(string);
