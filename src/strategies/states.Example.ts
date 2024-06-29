// This is a reference for each possible state configuration that should be considered for each Grapheme
// Each unique Grapheme should implement strategies for each of the valid state configurations

// ✅ VALID 1
const state1 = { wordExists: true, lineExists: true, canFitChar: true, canFitWord: true };

// ✅ VALID 2
const state2 = { wordExists: false, lineExists: true, canFitChar: true, canFitWord: true };

// ✅ VALID 3
const state3 = { wordExists: true, lineExists: false, canFitChar: true, canFitWord: true };

// ✅ VALID 4 - Starting state
const state4 = { wordExists: false, lineExists: false, canFitChar: true, canFitWord: true };

// ✅ VALID 5
const state7 = { wordExists: true, lineExists: false, canFitChar: false, canFitWord: true };

// ✅ VALID 6
const state9 = { wordExists: true, lineExists: true, canFitChar: true, canFitWord: false };

// ✅ VALID 7 - word and line are both full
const state13 = { wordExists: true, lineExists: true, canFitChar: false, canFitWord: false };

// // 🚫 INVALID - line exists and can fit word, but word is maxWidth (if word is maxWidth, then line can't fit it unless it's empty)
// const state8 = { wordExists: true, lineExists: true, canFitChar: false, canFitWord: true };

// 🚫 INVALID - word doesn't exist but still can't fit char (could encounter when maxWidth is less than 2 and char is an emoji)
// const state9 = { wordExists: false, lineExists: true, canFitChar: false, canFitWord: true };

// 🚫 INVALID - word doesn't exist but still can't fit char
// const state10 = { wordExists: false, lineExists: false, canFitChar: false, canFitWord: true };

// 🚫 INVALID - word doesn't exist, but still can't fit in line
// const state11 = { wordExists: false, lineExists: true, canFitChar: true, canFitWord: false };

// 🚫 INVALID - line doesn't exist, but still can't fit word
// const state12 = { wordExists: true, lineExists: false, canFitChar: true, canFitWord: false };

// 🚫 INVALID - word doesn't exist, but still can't fit in line
// const state13 = { wordExists: false, lineExists: false, canFitChar: true, canFitWord: false };

// 🚫 INVALID - word doesn't exist, but still can't fit char
// const state14 = { wordExists: false, lineExists: true, canFitChar: false, canFitWord: false };

// 🚫 INVALID - line doesn't exist, but still can't fit word
// const state15 = { wordExists: true, lineExists: false, canFitChar: false, canFitWord: false };

// 🚫 INVALID - word and char both don't exist but can't fit
// const state16 = { wordExists: false, lineExists: false, canFitChar: false, canFitWord: false };
