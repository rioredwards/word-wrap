import { WordWrapper } from "./WordWrapper";

export async function wrap(
  string: string,
  maxLength: number,
  maxHeight: number = Infinity
): Promise<string[] | string> {
  // Early return if string doesn't need to be wrapped
  if (string.length <= maxLength && !string.includes("\n")) return string;

  const wordWrapper = new WordWrapper(string, maxLength, maxHeight);
  const wrappedStrings: string[] | string = await wordWrapper.wrap();
  return wrappedStrings;
}
