import { emojiPattern } from "./emojis";
import emojiRegex from "emoji-regex";
import GraphemeSplitter from "grapheme-splitter";
console.clear();
console.log("\n_____________________________\n");

const longStr = `In the context of your emoji-aware word wrapping function, the point where an iterable iterator becomes significantly more performant than an array for string processing depends on several factors:Available Memory: The amount of memory your system has available plays a crucial role. If you have limited memory, iterable iterators will be advantageous much sooner, as they don't require storing the entire string in memory at once.Specific Implementation: The efficiency of both the iterable iterator and array implementations within the emoji-regex library can impact the threshold.Other Processing: If your function does more complex processing beyond word wrapping (like extensive string manipulation), the performance difference might be less noticeabGeneral GuidelinWhile there's no single "magic number," here's a rough estimaSmall Strings (Under 10,000 characters):  The performance difference between an array and an iterable iterator is likely negligible. You can probably use either without worrying about performanMedium Strings (10,000 - 100,000 characters): Start to consider an iterable iterator, especially if you have limited memory or are doing heavy processing on the striLarge Strings (100,000+ characters):  Iterable iterators are generally recommended for very large strings to avoid potential memory issues and to benefit from their streaming nature.ctical Testing:The best way to determine the exact threshold for your specific use case is to benchmark your function with both arrays and iterable iterators using different string sizes. Measure the execution time and memory usage to see where the performance difference becomes significant.Additional Considerations:Readability and Maintainability: If the performance difference is not critical for your application, choosing the data structure that makes your code easier to read and maintain might be a higher priority.Library-Specific Optimizations: The emoji-regex library might have internal optimizations that affect the performance of iterating over arrays vs. iterators. Check their documentation or source code for insights.I hope this helps! Let me know if you have any more questions.`;

const splitter = new GraphemeSplitter();

const string = "hello! 🦀🐷🧚🏽👼🏽";

// split the string to an array of grapheme clusters (one string each)
const graphemes = splitter.splitGraphemes(string);

console.log(graphemes);

// or do this if you just need their number
const graphemeCount = splitter.countGraphemes(string);

// Note: because the regular expression has the global flag set, this module
// exports a function that returns the regex rather than exporting the regular
// expression itself, to make it impossible to (accidentally) mutate the
// original regular expression.

// const text = `
// \u{231A}: ⌚ default emoji presentation character (Emoji_Presentation)
// \u{2194}\u{FE0F}: ↔️ default text presentation character rendered as emoji
// \u{1F469}: 👩 emoji modifier base (Emoji_Modifier_Base)
// \u{1F469}\u{1F3FF}: 👩🏿 emoji modifier base followed by a modifier
// `;

// const regex = emojiRegex();
// for (const match of text.matchAll(regex)) {
//   const emoji = match[0];
//   console.log(`Matched sequence ${emoji} — code points: ${[...emoji].length}`);
// }

// const emojiStrings = ["🐽"];

// const emoji = "🐽";
// console.log(emoji.substring(0, 2));

// const splitEmoji = emoji.split("");
// console.log("splitEmoji: ", splitEmoji);

// console.log("🍄".length);
// const lengths = emojiPattern.split("").map((emoji) => emoji.length);

// const firstLength = lengths[0];
// console.log(firstLength);
// console.log(lengths.every((length) => length === firstLength));
