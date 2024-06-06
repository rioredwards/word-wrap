import size from "window-size";
import wrap from "./customWordWrap";

console.clear();
// console.log("\n\n\n\n\n\n\n");
// NEW PLAN
// modify word-wrap library to return an array of strings instead of a single string with newlines
// This is necessary because printing out the table requires content from adjacent cells to be formed into a single line

let text =
  "Lorem 👍 ipsum dolor 🍔sit amet, cons🧠ectetur adipiscing el🫃🏽it, 🫃🏽 sed do eiusmod tempor inci🧟‍♂️didunt ut labore 🍔 et dolore mag🧚🏽na 🐆 aliqua. Ut enim ad minim veniam, 🍔 quis 👼🏽nostrud exercita 🐆 tion ullamco 🐙 labor🐠is nisi ut aliquip ex ea c🐙ommodo consequat. Duis aute irure dolor in reprehenderit in 🐙voluptate velit esse cill🐙um dolore eu fugiat nulla pariatur.";

let textWithEmoji = "👍🍔👍👍🧠 👍👍👍 👍👍OOOOOOOO OO👍👍👍🐆👍👍👍👍👍👍";

let emojiText =
  " 💁🏼 💁🏽 💁🏾 💁🏿 🙋🏻 🙋🏼 🙋🏽 🙋🏾 🙋🏿 🧏🏻 🧏🏼 🧏🏽 🧏🏾 🧏🏿 🙇🏻 🙇🏼 🙇🏽 🙇🏾 🙇🏿 🤦🏻 🤦🏼 🤦🏽 🤦🏾 🤦🏿 🤷🏻 🤷🏼 🤷🏽 🤷🏾 🤷🏿 👮🏻 👮🏼 👮🏽 👮🏾 👮🏿 🕵🏻 🕵🏼 🕵🏽 🕵🏾 🕵🏿 💂🏻 💂🏼 💂🏽 💂🏾 💂🏿 🥷🏻 🥷🏼 🥷🏽 🥷🏾 🥷🏿 👷🏻 👷🏼 👷🏽 👷🏾 👷🏿 🤴🏻 🤴🏼 🤴🏽 🤴🏾 🤴🏿 👸🏻 👸🏼 👸🏽 👸🏾 👸🏿 👳🏻 👳🏼 👳🏽 👳🏾 👳🏿 👲🏻 👲🏼 👲🏽 👲🏾 👲🏿 🧕🏻 🧕🏼 🧕🏽 🧕🏾 🧕🏿 🤵🏻 🤵🏼 🤵🏽 🤵🏾 🤵🏿 👰🏻 👰🏼 👰🏽 👰🏾 👰🏿 🤰🏻 🤰🏼 🤰🏽 🤰🏾 🤰🏿 🤱🏻 🤱🏼 🤱🏽 🤱🏾 🤱🏿 👼🏻 👼🏼 👼🏽 👼🏾 👼🏿 🎅🏻 🎅🏼 🎅🏽 🎅🏾 🎅🏿 🤶🏻 🤶🏼 🤶🏽 🤶🏾 🤶🏿 🦸🏻 🦸🏼 🦸🏽 🦸🏾 🦸🏿 🦹🏻 🦹🏼 🦹🏽 🦹🏾 🦹🏿 🧙🏻 🧙🏼 🧙🏽 🧙🏾 🧙🏿 🧚🏻 🧚🏼 🧚🏽 🧚🏾 🧚🏿 🧛🏻 🧛🏼 🧛🏽 🧛🏾 🧛🏿 🧜🏻 🧜🏼 🧜🏽 🧜🏾 🧜🏿 🧝🏻 🧝🏼 🧝🏽 🧝🏾 🧝🏿 💆🏻 💆🏼 💆🏽 💆🏾 💆🏿 💇🏻 💇🏼 💇🏽 💇🏾 💇🏿 🚶🏻 🚶🏼 🚶🏽 🚶🏾 🚶🏿 🧍🏻 🧍🏼 🧍🏽 🧍🏾 🧍🏿 🧎🏻 🧎🏼 🧎🏽 🧎🏾 🧎🏿 🏃🏻 🏃🏼 🏃🏽 🏃🏾 🏃🏿 💃🏻 💃🏼 💃🏽 💃🏾 💃🏿 🕺🏻 🕺🏼 🕺🏽 🕺🏾 🕺🏿 🕴🏻 🕴🏼 🕴🏽 🕴🏾 🕴🏿 🧖🏻 🧖🏼 🧖🏽 ";

// const wrapped = wrap(textWithEmoji, 10, 10);
// if (typeof wrapped !== "string") {
//   const wrappedJoined = wrapped.join("\n");
//   console.log(wrappedJoined);
// }

const substringTest = "Hello".substring(10);

console.log(substringTest);

// console.log(wrapped);

// console.log({ wrapped });
// console.log(wrapped);
// console.log({ wrapCount });

// console.log("");

// // console.log(chalk.red(wrap(text, { width: 20 })));

// // wrap("Hello, testing string", { width: 10 });

// function opts(margin: number): IOptions {
//   process.stdout.write("\x1bc");
//   var width = size.get().width - margin * 3;
//   let marginStr = " ".repeat(margin);
//   return { indent: marginStr, width: width };
// }

// console.log(wrap(text, opts(12)));

// process.stdout.on("resize", function () {
//   console.log(wrap(text, opts(12)));
// });

// setInterval(function () {}, 0);
