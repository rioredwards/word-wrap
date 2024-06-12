import GraphemeSplitter from "grapheme-splitter";
import { Grapheme } from "./Grapheme";
import { Word } from "./Word";
import { Line } from "./Line";
import { WordWrapper } from "./WordWrapper";

export interface Options {
  maxWidth: number;
  maxHeight: number;
}

export default function (string: string, options: Options): string[] | string {
  // Early return if string doesn't need to be wrapped
  if (string.length <= options.maxWidth && !string.includes("\n")) return string;

  const wordWrapper = new WordWrapper(string, options);
  const wrappedStrings: string[] | string = wordWrapper.wrap();
  return wrappedStrings;
}
