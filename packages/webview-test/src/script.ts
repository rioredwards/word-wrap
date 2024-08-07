import { wrap } from "word-wrap";

const wrappedTextEl = document.getElementById("wrappedText") as HTMLParagraphElement;
const inputTextEl = document.getElementById("inputText") as HTMLInputElement;

let inputText = "Hello, Wrapping!";
let wrappedText = wrap(inputText, 6, Infinity);

inputTextEl.value = inputText;
wrappedTextEl.innerText = typeof wrappedText === "string" ? wrappedText : wrappedText.join("\n");

inputTextEl.addEventListener("input", (e) => {
  inputText = (e.target as HTMLInputElement).value;
  wrappedText = wrap(inputText, 6, Infinity);
  inputTextEl.value = inputText;
  wrappedTextEl.innerText = typeof wrappedText === "string" ? wrappedText : wrappedText.join("\n");
});
