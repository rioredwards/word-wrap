import readline from "node:readline/promises";
import { WordWrapper } from "../src/WordWrapper";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function getInput(question: string) {
  const res = await rl.question(question);
  return res;
}

const testStr_NoSpaces = "00000000000000000000000000000000000000000000000000000000000";
// Because we generally don't know if we will need spaces or throw them away
// lets have a spaces buffer for the left of the current word that can be added or thrown out
// Spaces should be a property of word and indicate number of spaces to the left
// Spaces should only be committed if word can fit in line with them.
// Otherwise, line should be added to lines and all spaces removed from word
const testStr_spaces = "000000 0000000000000000000000000000000000000000000000000000";
const testStr = "Hello, this is a test!";
const testStr2 = "yo  hi 0000000";

// Intended steps for string:
// "Hello, this is a test!"

//   -  grapheme:
// *******  -  maxLengthStr:
//   -  word:
//   -  line:
// Hello,  -  lines:

// 1. Add grapheme H
// 2. Add grapheme E
// 3. Add grapheme L
// 4. Add grapheme L
// 5. Add grapheme O
// 6. Add grapheme ,
// 7. Add wordAndLine

console.log("TESTING");

const wordWrapper = new WordWrapper(testStr2, 7, Infinity);
wordWrapper._wrapWithPromptsAndLogging(getInput);
