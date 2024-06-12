// This file contains all code responsible for assigning graphemes their respective strategies & lengths

import { Grapheme, GraphemeType } from "../Grapheme";
import { Word } from "../Word";
import { Line } from "../Line";
import { defaultStrategies, finalStrategies, spaceStrategies } from ".";

/** Contract that each grapheme strategy must implement */
export type GraphemeStrategy = (grapheme: Grapheme, word: Word, line: Line, lines: Line[]) => void;
export type GraphemeStateToStrategyMap = Record<string, GraphemeStrategy>;

export const graphemeTypeToStrategyMap: Record<GraphemeType, GraphemeStateToStrategyMap> = {
  default: defaultStrategies,
  space: spaceStrategies,
  final: finalStrategies,
  // newLine: newLineStrategy,
  // tab: tabStrategy,
  // emoji: emojiStrategy,
  // ignore: ignoreStrategy,
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
