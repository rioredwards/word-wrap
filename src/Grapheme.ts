import {
  GraphemeStrategy,
  graphemeLengthMap,
  graphemeStrategyMap,
} from "./strategies/GraphemeStrategies";

export type GraphemeType = "default" | "space" | "newLine" | "ignore" | "tab" | "emoji" | "empty";

const EMOJI_REGEX = /\p{Emoji_Presentation}/u;

export const classifyGrapheme = (val: string): GraphemeType => {
  switch (true) {
    case val === undefined:
      return "empty";
    case val === " ":
      return "space";
    case val === "\n":
      return "newLine";
    case val === "\t":
      return "tab";
    case val === "\r":
      return "ignore";
    case EMOJI_REGEX.test(val!):
      return "emoji";
    default:
      return "default";
  }
};

/** Represents a single text character */
export class Grapheme {
  strategy: GraphemeStrategy;
  val: string;
  type: GraphemeType;
  length: number;
  spacesBefore: string = "";
  spacesAfter: string = "";

  constructor(val: string) {
    this.val = val;
    this.type = classifyGrapheme(val);
    this.strategy = graphemeStrategyMap[this.type];
    this.length = graphemeLengthMap[this.type];
  }
}
