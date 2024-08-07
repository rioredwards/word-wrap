import { WordWrapper } from "./WordWrapper";

export function wrap(
  string: string,
  maxLength: number,
  maxHeight: number = Infinity
): string[] | string {
  // Early return if string doesn't need to be wrapped
  if (string.length <= maxLength && !string.includes("\n")) return string;

  const wordWrapper = new WordWrapper(string, maxLength, maxHeight);
  const wrappedStrings: string[] | string = wordWrapper.wrapAll();
  return wrappedStrings;
}
