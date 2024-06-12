// Idea: Emoji's length should be set to 1, if maxLength is 1

// ✅ VALID 1
const state1 = { wordExists: true, lineExists: true, canFitChar: true, canFitWord: true };

// ✅ VALID 2
const state2 = { wordExists: false, lineExists: true, canFitChar: true, canFitWord: true };

// ✅ VALID 3
const state3 = { wordExists: true, lineExists: false, canFitChar: true, canFitWord: true };

// ✅ VALID 4 - Starting state
const state4 = { wordExists: false, lineExists: false, canFitChar: true, canFitWord: true };

// ✅ VALID 6
const state7 = { wordExists: true, lineExists: false, canFitChar: false, canFitWord: true };

// ✅ VALID 7
const state9 = { wordExists: true, lineExists: true, canFitChar: true, canFitWord: false };

// ✅ VALID 8 - word and line are both full
const state13 = { wordExists: true, lineExists: true, canFitChar: false, canFitWord: false };

// // 🚫 INVALID - line exists and can fit word, but word is maxWidth (if word is maxWidth, then line can't fit it unless it's empty)
// const state5 = { wordExists: true, lineExists: true, canFitChar: false, canFitWord: true };

// 🚫 INVALID - word doesn't exist but still can't fit char (could encounter when maxWidth is less than 2 and char is an emoji)
// const state6 = { wordExists: false, lineExists: true, canFitChar: false, canFitWord: true };

// 🚫 INVALID - word doesn't exist but still can't fit char
// const state8 = { wordExists: false, lineExists: false, canFitChar: false, canFitWord: true };

// 🚫 INVALID - word doesn't exist, but still can't fit in line
// const state10 = { wordExists: false, lineExists: true, canFitChar: true, canFitWord: false };

// 🚫 INVALID - line doesn't exist, but still can't fit word
// const state11 = { wordExists: true, lineExists: false, canFitChar: true, canFitWord: false };

// 🚫 INVALID - word doesn't exist, but still can't fit in line
// const state12 = { wordExists: false, lineExists: false, canFitChar: true, canFitWord: false };

// 🚫 INVALID - word doesn't exist, but still can't fit char
// const state14 = { wordExists: false, lineExists: true, canFitChar: false, canFitWord: false };

// 🚫 INVALID - line doesn't exist, but still can't fit word
// const state15 = { wordExists: true, lineExists: false, canFitChar: false, canFitWord: false };

// 🚫 INVALID - word and char both don't exist but can't fit
// const state16 = { wordExists: false, lineExists: false, canFitChar: false, canFitWord: false };
