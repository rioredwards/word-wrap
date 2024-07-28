// This file contains all code responsible for assigning graphemes their respective strategies & lengths

import { GraphemeType } from "../Grapheme";
import {
  defaultStrategies,
  emojiStrategies,
  finalStrategies,
  ignoreStrategies,
  newlineStrategies,
  spaceStrategies,
  tabStrategies,
} from ".";
import { State } from "../classifyState";

/** Contract that each grapheme strategy must implement */
export type GraphemeStrategy = (state: State) => void;
export type GraphemeStateToStrategyMap = Record<string, GraphemeStrategy>;

export const graphemeTypeToStrategyMap: Record<GraphemeType, GraphemeStateToStrategyMap> = {
  default: defaultStrategies,
  space: spaceStrategies,
  final: finalStrategies,
  newLine: newlineStrategies,
  tab: tabStrategies,
  emoji: emojiStrategies,
  ignore: ignoreStrategies,
};

export const graphemeLengthMap: Record<GraphemeType, number> = {
  default: 1,
  space: 1,
  newLine: 0,
  tab: 4,
  emoji: 2,
  ignore: 0,
  final: 1, // TODO This might cause issues...
};
