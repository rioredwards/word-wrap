// This file contains all code responsible for assigning graphemes their respective strategies & lengths

import { type GraphemeType } from "../Grapheme.js";
import {
  defaultStrategies,
  emojiStrategies,
  ignoreStrategies,
  newlineStrategies,
  spaceStrategies,
  tabStrategies,
} from "./index.js";
import { type State } from "../classifyState.js";

/** Contract that each grapheme strategy must implement */
export type GraphemeStrategy = (state: State) => void;
export type GraphemeStateToStrategyMap = Record<string, GraphemeStrategy>;

export const graphemeTypeToStrategyMap: Record<GraphemeType, GraphemeStateToStrategyMap> = {
  default: defaultStrategies,
  space: spaceStrategies,
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
};
