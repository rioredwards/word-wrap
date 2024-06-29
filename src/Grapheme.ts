import {
  GraphemeStateToStrategyMap,
  graphemeLengthMap,
  graphemeTypeToStrategyMap,
} from "./strategies/graphemeTypeMaps";

export type GraphemeType = "default" | "space" | "newLine" | "ignore" | "tab" | "emoji" | "final";

const EMOJI_REGEX = /\p{Emoji_Presentation}/u;

const classifyGrapheme = (val: string): GraphemeType => {
  switch (true) {
    case val === undefined:
      return "final";
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
  strategies: GraphemeStateToStrategyMap;
  val: string;
  type: GraphemeType;
  length: number;
  spacesBefore: string = "";
  spacesAfter: string = "";

  constructor(val: string) {
    this.val = val;
    this.type = classifyGrapheme(val);
    this.strategies = graphemeTypeToStrategyMap[this.type];
    this.length = graphemeLengthMap[this.type];
  }
}
