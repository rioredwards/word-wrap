import { Grapheme, GraphemeType } from "../Grapheme";
import { Line } from "../Line";
import { Word } from "../Word";

/** Contract that each grapheme strategy must implement */
export type GraphemeStrategy = (grapheme: Grapheme, word: Word, line: Line, lines: Line[]) => void;

export const graphemeStrategyMap: Record<GraphemeType, GraphemeStrategy> = {
  default: defaultStrategy,
  space: spaceStrategy,
  empty: emptyStrategy,
  newLine: newLineStrategy,
  tab: tabStrategy,
  emoji: emojiStrategy,
  ignore: ignoreStrategy,
};

export const graphemeLengthMap: Record<GraphemeType, number> = {
  default: 1,
  space: 1,
  empty: 0,
  newLine: 0,
  tab: 4,
  emoji: 2,
  ignore: 0,
};
